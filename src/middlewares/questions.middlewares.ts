import multer from 'multer';

export const filesValidator = (name: string) => {
  const upload = multer();

  return upload.array(name);
};
