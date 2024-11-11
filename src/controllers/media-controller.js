import {fetchMediaItems, addMediaItem} from '../models/media-model.js';

const getItmes = (req, res) => {
  res.json(fetchMediaItems());
};

const postItmes = (req, res) => {
  console.log('post req body', req.body);
  const id = addMediaItem(req.body);
  if (!id) {
    res.status(404).json({message: '', id: id});
  }
  res.status(201).json({message: 'Item added', id: id});
};

const getItemById = (req, res) => {
  //TODO: move data access logic to model
  const id = parseInt(req.params.id);
  const item = mediaItems.find((item) => item.media_id === id);
  if (item) {
    if (req.query.format === 'plain') {
      res.send(item.name);
      return;
    }
    res.json(item);
  } else {
    res.status(404).json({message: 'item not found'});
  }
};

const putItemById = (req, res) => {
  const id = parseInt(req.params.id);
  let item = mediaItems.findIndex((item) => item.media_id === id);
  mediaItems[item] = {...mediaItems[item], ...req.body};
  res.status(201).json({item});
};

export {getItmes, postItmes, getItemById, putItemById};
