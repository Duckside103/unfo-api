"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const stream_1 = __importDefault(require("stream"));
const KEY_FILE_PATH = path_1.default.resolve('drive_service_keys.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES
});
const uploadImage = async (file) => {
    const bufferStream = new stream_1.default.PassThrough();
    bufferStream.end(file.buffer);
    const { data } = await googleapis_1.google.drive({ version: 'v3', auth }).files.create({
        media: {
            mimeType: file.mimetype,
            body: bufferStream
        },
        requestBody: {
            name: file.originalname,
            parents: [process.env.DRIVE_FOLDER_ID]
        },
        fields: 'id,name'
    });
    return data;
};
exports.uploadImage = uploadImage;
