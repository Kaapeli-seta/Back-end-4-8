import express from 'express';
const mediaRouter = express.Router();
import {
  postItmes,
  getItemById,
  getItmes,
  putItemById,
} from '../controllers/media-controller.js';
mediaRouter.route('/json').get(getItmes).post(postItmes);

mediaRouter.route('/:id').get(getItemById).put(putItemById);

export {mediaRouter};
