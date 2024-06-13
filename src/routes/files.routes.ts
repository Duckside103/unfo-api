import express from 'express';

import { downloadExtensionController } from '~/controllers/files.controllers';
import { wrapRequestHandler } from '~/utils/handlers';

const filesRouter = express.Router();

/**
 * @method GET
 * @path files/
 * @aim Download extension file
 */
filesRouter.get('/', wrapRequestHandler(downloadExtensionController));

export default filesRouter;
