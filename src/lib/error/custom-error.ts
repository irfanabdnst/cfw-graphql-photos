export class ErrorResponse implements Error {
    constructor(code: number, name: string, message: string, details: unknown = null) {
        this.code = code;
        this.name = name;
        this.message = message;
        this.details = details;
    }

    code: number;
    name: string;
    message: string;
    details?: unknown = null;
}

const notFound = (message = 'Data not found', details: unknown = null) => {
    return new ErrorResponse(404, 'Not Found', message, details);
};

const unauthorized = (message = 'Not authorized', details: unknown = null) => {
    return new ErrorResponse(401, 'Unauthorized', message, details);
};

const badRequest = (message = 'Bad request', details: unknown = null) => {
    return new ErrorResponse(400, 'Bad Request', message, details);
};

const forbidden = (message = 'Have no access', details: unknown = null) => {
    return new ErrorResponse(403, 'Forbidden', message, details);
};

const conflict = (message = 'Data already exist', details: unknown = null) => {
    return new ErrorResponse(409, 'Conflict', message, details);
};

const unprocessableEntity = (message = 'Unprocessable Entity', details: unknown = null) => {
    return new ErrorResponse(422, 'Unprocessable Entity', message, details);
};

const internalServerError = (message = 'Something went wrong', details: unknown = null) => {
    return new ErrorResponse(500, 'Internal Server Error', message, details);
};

export const createError = {
    notFound,
    unauthorized,
    badRequest,
    forbidden,
    conflict,
    unprocessableEntity,
    internalServerError,
};
