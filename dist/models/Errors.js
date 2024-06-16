"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityError = exports.ErrorWithStatus = void 0;
const http_1 = require("../constants/http");
class ErrorWithStatus {
    message;
    status;
    constructor({ message, status }) {
        this.message = message;
        this.status = status;
    }
}
exports.ErrorWithStatus = ErrorWithStatus;
class EntityError extends ErrorWithStatus {
    errors;
    constructor({ message = 'Somethings went wrong', errors }) {
        super({
            message,
            status: http_1.HttpStatus.UNPROCESSABLE_ENTITY
        });
        this.errors = errors;
    }
}
exports.EntityError = EntityError;
