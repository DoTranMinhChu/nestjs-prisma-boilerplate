
import { EAccountType } from '@common/enums/accountType.enum';
import { IAccessToken } from '@common/interfaces/auth/accessToken.interface';
import { LoginInAppRequest } from '@common/requests/auth/loginInApp.request';
import { RegisterInAppRequest } from '@common/requests/auth/registerInApp.request';
import { LoginResponse } from '@common/responses/auth/login.response';
import { BcryptUtil } from '@common/utils/bcrypt.util';
import { TokenUtil } from '@common/utils/token.util';
import { RefreshTokenUserRepository } from '@modules/refreshTokenUser/refreshTokenUser.repository';
import { UserRepository } from '@modules/user/user.repository';
import { Injectable } from '@nestjs/common';


@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly refreshTokenUserRepository: RefreshTokenUserRepository
    ) { }

    async userRegisterInApp(
        registerRequest: RegisterInAppRequest
    ): Promise<LoginResponse> {
        const reqLogin: LoginInAppRequest = {
            ...registerRequest,
        };
        // const existedUser = await this.userRepository.findByUsername(
        //     registerRequest.username
        // );

        // if (existedUser) {
        //     throw errorService.auth.errorCustom(
        //         ERROR_MESSAGE.USERNAME_ALREADY_REGISTERED
        //     );
        // }
        reqLogin.password = await BcryptUtil.hashData(registerRequest.password);
        await this.userRepository.create(reqLogin);

        return await this.userLoginInApp({
            ...reqLogin,
            password: registerRequest.password,
        });
    }


    async userLoginInApp(reqLogin: LoginInAppRequest): Promise<LoginResponse> {
        const { username, password } = reqLogin;
        // if (!username || !password) {
        //   throw errorService.router.badRequest()
        // }
        let user = await this.userRepository.findOne({
            where: {
                username,
            },
        });
        // if (!user) {
        //   throw errorService.auth.errorCustom(
        //     ERROR_MESSAGE.USERNAME_DOES_NOT_EXIST
        //   );
        // }
        // if (user.loginType != LoginType.INAPP) {
        //   switch (user.loginType) {
        //     case LoginType.GOOGLE: {
        //       throw errorService.database.errorCustom(
        //         ERROR_MESSAGE.THIS_ACCOUNT_IS_GOOGLE
        //       );
        //     }
        //     case LoginType.APPLE: {
        //       throw errorService.database.errorCustom(
        //         ERROR_MESSAGE.THIS_ACCOUNT_IS_APPLE
        //       );
        //     }
        //     case LoginType.KAKAO: {
        //       throw errorService.database.errorCustom(
        //         ERROR_MESSAGE.THIS_ACCOUNT_IS_KAKAOTALK
        //       );
        //     }
        //   }
        // }

        if (!(await BcryptUtil.compareDataWithHash(password, user?.password!!))) {
        //   throw errorService.auth.errorCustom(
        //     ERROR_MESSAGE.PASSWORD_OR_USERNAME_INCORRECT
        //   );
        }
        const accessTokenPayload: IAccessToken = {
            id: user?.id!,
            loginType: user?.loginType!,
            type: EAccountType.USER,
        };

        return {
            accessToken: await this.generateAccessToken(accessTokenPayload),
            refreshToken: await this.generateRefreshTokenUser(accessTokenPayload.id),
        };
    }

    async generateAccessToken(accessTokenPayload: IAccessToken): Promise<string> {
        return await TokenUtil.generateToken(accessTokenPayload);
    }

    async generateRefreshTokenUser(userId: string): Promise<string> {
        const refreshTokenUser = await this.refreshTokenUserRepository.findOneByUserId(
            userId
        );
        if (refreshTokenUser) {
            try {
                TokenUtil.decodeToken(refreshTokenUser.refreshToken!!);
                return refreshTokenUser.refreshToken!!;
            } catch (e) {
                const refreshToken = await TokenUtil.generateToken(
                    {},
                    { exp: "1 years" }
                );
                const newRefreshTokenAdmin =
                    await this.refreshTokenUserRepository.updateByUserId(userId, {
                        refreshToken,
                    });
                return newRefreshTokenAdmin.refreshToken!!;
            }
        }
        const refreshToken = await TokenUtil.generateToken(
            {},
            { exp: "1 years" }
        );

        const newRefreshTokenUser = await this.refreshTokenUserRepository.create({
            user: {
                connect: {
                    id: userId,
                },
            },
            refreshToken,
        });
        return newRefreshTokenUser.refreshToken!!;
    }
}