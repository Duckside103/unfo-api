import { google } from 'googleapis';
import { ObjectId } from 'mongodb';
import path from 'path';
import Stream from 'stream';

const KEY_FILE_PATH = path.resolve('drive_service_keys.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES
});

export const uploadImage = async (file: Express.Multer.File) => {
  const bufferStream = new Stream.PassThrough();
  bufferStream.end(file.buffer);

  const _id = new ObjectId();

  const { data } = await google.drive({ version: 'v3', auth }).files.create({
    media: {
      mimeType: file.mimetype,
      body: bufferStream
    },
    requestBody: {
      name: _id.toString(),
      parents: [process.env.DRIVE_FOLDER_ID as string]
    },
    fields: 'id,name'
  });

  return data as {
    id: string;
    name: string;
  };
};

export const deleteImage = async (fileId: string) => {
  const response = await google.drive({ version: 'v3', auth }).files.delete({
    fileId
  });

  return response;
};
