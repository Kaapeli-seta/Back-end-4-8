import express from 'express';
import multer from 'multer';
import {
  postItem,
  getItemById,
  getItems,
  putItem,
  DeleteItem,
  getUsers,
  getUserById,
  postUser,
  putUser,
  DeleteUser,
} from '../controllers/media-controller.js';

const upload = multer({dest: 'uploads/'});
const mediaRouter = express.Router();

mediaRouter
  .route('/media/json')
  .get(getItems)
  .post(upload.single('file'), postItem);
mediaRouter
  .route('/media/:id')
  .get(getItemById)
  .put(upload.single('file'), putItem)
  .delete(DeleteItem);
mediaRouter.route('/users').get(getUsers).post(upload.single('file'), postUser);
mediaRouter
  .route('/users/:id')
  .get(getUserById)
  .put(upload.single('file'), putUser)
  .delete(DeleteUser);
export {mediaRouter};
