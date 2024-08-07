"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadExtensionController = void 0;
const path_1 = __importDefault(require("path"));
const downloadExtensionController = async (req, res) => {
    const file = path_1.default.resolve('src/assets/c_Lab_207.rar');
    return res.download(file);
};
exports.downloadExtensionController = downloadExtensionController;
