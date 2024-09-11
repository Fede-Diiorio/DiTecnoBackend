export default class CustomError {
    static createError({
        name = 'Error',
        cause,
        message,
        status

    }) {
        const error = new Error(message);
        error.name = name;
        error.cause = cause;
        error.message = message;
        error.status = status;
        return error;
    };
};