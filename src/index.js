// index.js

import express from 'express';
import {fetchMediaItems} from './models/media-model.js';
import {mediaRouter} from './routes/media-router.js';
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

app.use('/api', mediaRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
