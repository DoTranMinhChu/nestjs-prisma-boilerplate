
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findAll() {
        return await this.userRepository.users();
    }
}