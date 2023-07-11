
export const EXCEPTION = {
    // DEFUALT DATABASE
    RECORD_NOT_FOUND: {
        message: 'Record Not Found.',
        exceptionCode: 10000,
    },

    // DEFUALT AUTH
    UNAUTHORIZED: {
        message: 'Unauthorized.',
        exceptionCode: 10001,
    },
    YOU_NOT_PERMISSIONS: {
        message: 'You are not permissions.',
        exceptionCode: 10002,
    },
    TOKEN_EXPIRED: {
        message: 'Token Expried.',
        exceptionCode: 10003,
    },
    USER_BLOCK: {
        message: 'User Blocked.',
        exceptionCode: 10004,
    },
    BAD_TOKEN: {
        message: 'Bad Token.',
        exceptionCode: 10005,
    },

    // DEFUALT ROUTER
    SORRY_SOMETHING_WENT_WRONG: {
        message: 'Sorry! Something went wrong.',
        exceptionCode: 10006,
    },
    THE_API_NOT_SUPPORTED: {
        message: 'The API is not supported.',
        exceptionCode: 10007,
    },
    BAD_REQUEST: {
        message: 'Bad Request.',
        exceptionCode: 10008,
    },

    // USER
    USERNAME_ALREADY_REGISTERED: {
        message: 'Username already registered.',
        exceptionCode: 10100,
    },
    ACCOUNT_HAS_BEEN_DELETED: {
        message: 'This account has been deleted. Check back with your manager.',
        exceptionCode: 10101,
    },
    ACCOUNT_HAS_BEEN_BLOCKED: {
        message: 'This account has been blocked.',
        exceptionCode: 10102,
    },
    ACCOUNT_DOES_NOT_EXIST: {
        message: 'Account does not exist.',
        exceptionCode: 10103,
    }
}