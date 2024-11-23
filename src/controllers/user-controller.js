import {
  fetchUsers,
  fetchUserById,
  addUser,
  updateUser,
  removeUser,
} from '../models/user-model.js';

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
    const item = await fetchUserById(id);
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
    const userEdited = await updateUser(
      req.params.id,
      req.user.user_id,
      newDetails,
    );
    if (userEdited === 0) {
      return res.status(404).json({message: 'User not found'});
    } else if (userEdited === 1) {
      return res.status(200).json({message: 'User updated', id: req.params.id});
    } else {
      return res
        .status(401)
        .json({message: 'User does not match', id: req.params.id});
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
    const state = await removeUser(id, req.user.user_id);
    if (state === 2) {
      res.status(401).json({message: 'User does not match'});
    } else {
      res.status(200).json({message: 'User removed'});
    }
  } catch (error) {
    return res
      .status(500)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

export {getUsers, getUserById, postUser, putUser, DeleteUser};
