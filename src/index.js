// index.js

import express from 'express';
import {fetchMediaItems} from './models/media-model.js';
import {mediaRouter} from './routes/media-router.js';
import {userRouter} from './routes/user-routes.js';
import authRouter from './routes/auth-router.js';
import {notFoundHandler, errorHandler} from './middlewares/error-handler.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.get('/api', async (req, res) => {
  res.render('index', {
    title: 'API documentation',
    massage: 'something',
    mediaData: await fetchMediaItems(),
  });
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/media', mediaRouter);
// Default for all routes not handled by routers above
app.use(notFoundHandler);
// Add error handler middleware as the last middleware in the chain
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
