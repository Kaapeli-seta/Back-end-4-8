import express from 'express';
import multer from 'multer';
import {
  postItem,
  getItemById,
  getItems,
  putItem,
  DeleteItem,
} from '../controllers/media-controller.js';

import {authenticateToken} from '../middlewares/authentication.js';

const upload = multer({dest: 'uploads/'});
const mediaRouter = express.Router();

mediaRouter
  .route('/media')
  .get(getItems)
  .post(authenticateToken, upload.single('file'), postItem);
mediaRouter
  .route('/media/:id')
  .get(getItemById)
  .put(authenticateToken, upload.single('file'), putItem)
  .delete(authenticateToken, DeleteItem);

export {mediaRouter};
