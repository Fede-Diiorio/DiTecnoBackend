class CustomError {
    static createError({
        name = 'Error',
        cause,
        message,
        status

    }) {
        const error = new Error(message);
        error.name = name;
        error.cause = cause;
        error.status = status
        return error;
    }

}

module.exports = { CustomError };