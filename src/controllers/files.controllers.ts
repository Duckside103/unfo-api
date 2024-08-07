import { Request, Response } from 'express';
import path from 'path';

export const downloadExtensionController = async (
  req: Request,
  res: Response
) => {
  const file = path.resolve('src/assets/c_Lab_207.rar');

  return res.download(file);
};
