"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = void 0;
const lodash_1 = require("lodash");
const http_1 = require("../constants/http");
const Errors_1 = require("../models/Errors");
const defaultErrorHandler = (err, req, res, _next) => {
    if (err instanceof Errors_1.ErrorWithStatus) {
        return res
            .status(err.status || http_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json((0, lodash_1.omit)(err, 'status'));
    }
    Object.getOwnPropertyNames(err).forEach((key) => {
        Object.defineProperty(err, key, { enumerable: true });
    });
    return res.status(http_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        errorInfo: (0, lodash_1.omit)(err, ['stack'])
    });
};
exports.defaultErrorHandler = defaultErrorHandler;
