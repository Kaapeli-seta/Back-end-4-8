import express from 'express';
import multer from 'multer';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  DeleteUser,
} from '../controllers/user-controller.js';

import {authenticateToken} from '../middlewares/authentication.js';

const upload = multer({dest: 'uploads/'});
const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(upload.single('file'), postUser);
userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, upload.single('file'), putUser)
  .delete(authenticateToken, DeleteUser);

export {userRouter};
