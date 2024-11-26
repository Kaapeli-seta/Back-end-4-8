import express from 'express';
import {upload} from '../middlewares/upload.js';
import {body} from 'express-validator';
import 'dotenv/config';
import {
  postItem,
  getItemById,
  getItems,
  putItem,
  DeleteItem,
} from '../controllers/media-controller.js';

import {authenticateToken} from '../middlewares/authentication.js';

const mediaRouter = express.Router();

mediaRouter
  .route('/')
  .get(getItems)
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').trim().isLength({min: 3, max: 50}),
    body('description').trim().isLength({max: 255}),
    postItem,
  );
mediaRouter
  .route('/:id')
  .get(getItemById)
  .put(authenticateToken, upload.single('file'), putItem)
  .delete(authenticateToken, DeleteItem);

export {mediaRouter};
