import {validationResult} from 'express-validator';
import {
  fetchMediaItems,
  addMediaItem,
  fetchMediaItemById,
  updateMediaItem,
  removeItem,
} from '../models/media-model.js';
import fs from 'fs';

const getItems = async (req, res) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

const postItem = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    next(error);
  }
  const errors = validationResult(req);
  console.log('post req file', req.file);
  console.log('post req body', req.body);
  if (!errors.isEmpty()) {
    console.log('postMedia errors', errors.array());
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  // destructure title and description property values from req.body
  const {title, description} = req.body;

  const newMediaItem = {
    user_id: req.user.user_id,
    title,
    description,
    filename: req.file.filename,
    filesize: req.file.size,
    media_type: req.file.mimetype,
    created_at: new Date().toISOString(),
  };
  try {
    const id = await addMediaItem(newMediaItem);
    res.status(201).json({message: 'Item added', id: id});
  } catch (error) {
    return res
      .status(400)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

const getItemById = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('getItemById', id);
  try {
    const item = await fetchMediaItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({message: 'Item not found'});
    }
  } catch (error) {
    console.error('getItemById', error.message);
    res.status(503).json({error: 503, message: error.message});
  }
};

const putItem = async (req, res) => {
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  console.log(title, description);
  const newDetails = {
    title,
    description,
  };
  try {
    const itemsEdited = await updateMediaItem(
      req.params.id,
      req.user.user_id,
      newDetails,
    );
    // if no items were edited (id was not found in DB), return 404
    if (itemsEdited === 0) {
      return res.status(404).json({message: 'Item not found'});
    } else if (itemsEdited === 1) {
      return res.status(200).json({message: 'Item updated', id: req.params.id});
    } else {
      return res
        .status(401)
        .json({message: 'Not item owner', id: req.params.id});
    }
  } catch (error) {
    return res
      .status(500)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

const DeleteItem = async (req, res) => {
  const id = req.params.id;
  try {
    const state = await removeItem(id, req.user.user_id);
    if (state === 2) {
      res.status(401).json({message: 'Not item owner'});
    } else {
      const filePath = `./uploads/${state.filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error removing file: ${err}`);
          return;
        }
        console.log(`File ${filePath} has been successfully removed.`);
      });
      res.status(200).json({message: 'Item removed'});
    }
  } catch (error) {
    return res
      .status(500)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

export {getItems, postItem, getItemById, putItem, DeleteItem};
