// index.js

import express from 'express';
import {mediaItems} from './controllers/media-controller.js';
import {mediaRouter} from './routes/media-router.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express.json());
app.use(express.static('public'));
app.use('/media', express.static('media'));

app.get('/api', (req, res) => {
  res.render('index', {
    title: 'API documentation',
    massage: 'something',
    mediaData: mediaItems,
  });
});

app.use('/api/media', mediaRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
