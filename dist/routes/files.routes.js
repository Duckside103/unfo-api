"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const files_controllers_1 = require("../controllers/files.controllers");
const handlers_1 = require("../utils/handlers");
const filesRouter = express_1.default.Router();
/**
 * @method GET
 * @path files/
 * @aim Download extension file
 */
filesRouter.get('/', (0, handlers_1.wrapRequestHandler)(files_controllers_1.downloadExtensionController));
exports.default = filesRouter;
