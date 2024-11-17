import {
  fetchMediaItems,
  addMediaItem,
  fetchMediaItemById,
  updateMediaItem,
  removeItem,
  fetchUsers,
  fetchUserItemById,
  addUser,
  updateUser,
  removeUser,
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

const postItem = async (req, res) => {
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  // quick and dirty validation example, better input validatation is added later
  console.log('post req body', req.body);
  console.log('post req file', req.file);
  if (!title || !req.file) {
    return res
      .status(400)
      .json({message: 'Title, description and file required'});
  }

  const newMediaItem = {
    // user id is hardcoded for now
    user_id: 1,
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
  console.log('put req body', req.body);
  const {title, description} = req.body;
  console.log(title, description);
  const newDetails = {
    title,
    description,
  };
  try {
    const itemsEdited = await updateMediaItem(req.params.id, newDetails);
    // if no items were edited (id was not found in DB), return 404
    if (itemsEdited === 0) {
      return res.status(404).json({message: 'Item not found'});
    } else if (itemsEdited === 1) {
      return res.status(200).json({message: 'Item updated', id: req.params.id});
    }
  } catch (error) {
    return res
      .status(500)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

const DeleteItem = async (req, res) => {
  const id = req.params.id;
  const item = await fetchMediaItemById(id);
  console.log(item[0]);
  console.log(item[0].filename);
  const filePath = `./uploads/${item[0].filename}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }
    console.log(`File ${filePath} has been successfully removed.`);
  });
  try {
    await removeItem(id);
    res.status(200).json({message: 'Item removed'});
  } catch (error) {
    return res
      .status(500)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

const getUsers = async (req, res) => {
  try {
    res.json(await fetchUsers());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};
const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('getUserById', id);
  try {
    const item = await fetchUserItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.error('getUserById', error.message);
    res.status(503).json({error: 503, message: error.message});
  }
};

const postUser = async (req, res) => {
  // destructure title and description property values from req.body
  const {username, password, email} = req.body;
  // quick and dirty validation example, better input validatation is added later
  console.log('post req body', req.body);
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({message: 'Title, description and file required'});
  }

  const newUser = {
    // user id is hardcoded for now
    username,
    password,
    email,
    user_level_id: 2,
    created_at: new Date().toISOString(),
  };
  try {
    const id = await addUser(newUser);
    res.status(201).json({message: 'User added', id: id});
  } catch (error) {
    return res
      .status(400)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

const putUser = async (req, res) => {
  console.log('put req body', req.body);
  const {username, password, email} = req.body;
  const newDetails = {
    username,
    password,
    email,
  };
  try {
    const userEdited = await updateUser(req.params.id, newDetails);
    if (userEdited === 0) {
      return res.status(404).json({message: 'User not found'});
    } else if (userEdited === 1) {
      return res.status(200).json({message: 'User updated', id: req.params.id});
    }
  } catch (error) {
    return res
      .status(500)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

const DeleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await removeUser(id);
    res.status(200).json({message: 'User removed'});
  } catch (error) {
    return res
      .status(500)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

export {
  getItems,
  postItem,
  getItemById,
  putItem,
  DeleteItem,
  getUsers,
  getUserById,
  postUser,
  putUser,
  DeleteUser,
};
