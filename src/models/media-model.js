import promisePool from '../../utils/database.js';
// Dummy mock data

const fetchMediaItems = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    console.log(rows[0]);
    return rows;
  } catch (e) {
    throw new Error('Database error ' + e.message);
  }
};

const fetchMediaItemById = async (id) => {
  try {
    const sql = 'SELECT * FROM MediaItems WHERE media_id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    return rows;
  } catch (e) {
    throw new Error('Database error ' + e.message);
  }
};

const addMediaItem = async (newItem) => {
  console.log(newItem);
  const sql = `INSERT INTO MediaItems
                (user_id, title, description, filename, filesize, media_type)
                VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    newItem.user_id,
    newItem.title,
    newItem.description,
    newItem.filename,
    newItem.filesize,
    newItem.media_type,
  ];
  try {
    const result = await promisePool.query(sql, params);
    // console.log('addMediaItem', result);
    return result[0].insertId;
  } catch (error) {
    console.error('addMediaItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

const updateMediaItem = async (id, updatedItem) => {
  const sql = `UPDATE MediaItems SET title = ?, description = ? WHERE media_id = ?`;
  const params = [updatedItem.title, updatedItem.description, id];
  try {
    const result = await promisePool.query(sql, params);
    console.log('updateMediaItem', result);
    return result[0].affectedRows;
  } catch (error) {
    console.error('updateMediaItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

const removeItem = async (id) => {
  const sql = `DELETE FROM mediaitems WHERE media_id = ${id}`;
  try {
    const result = await promisePool.query(sql);
    return result;
  } catch (error) {
    console.error('removeItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

const fetchUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    console.log(rows[0]);
    return rows;
  } catch (e) {
    throw new Error('Database error ' + e.message);
  }
};

const fetchUserItemById = async (id) => {
  try {
    const sql = 'SELECT * FROM Users WHERE user_id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    return rows;
  } catch (e) {
    throw new Error('Database error ' + e.message);
  }
};

const addUser = async (newUser) => {
  console.log(newUser);
  const sql = `INSERT INTO users
                (username, password, email, user_level_id)
                VALUES (?, ?, ?, ?)`;
  const params = [
    newUser.username,
    newUser.password,
    newUser.email,
    newUser.user_level_id,
  ];
  try {
    const result = await promisePool.query(sql, params);
    // console.log('addMediaItem', result);
    return result[0].insertId;
  } catch (error) {
    console.error('addMediaItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

const updateUser = async (id, updatedUser) => {
  const sql = `UPDATE users SET username = ?, password = ?, email = ? 
  WHERE user_id = ?`;
  const params = [
    updatedUser.username,
    updatedUser.password,
    updatedUser.email,
    id,
  ];
  try {
    const result = await promisePool.query(sql, params);
    console.log('User updated:', result);
    return result[0].affectedRows;
  } catch (error) {
    console.error('updateMediaItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

const removeUser = async (id) => {
  const sql = `DELETE FROM users WHERE user_id = ${id}`;
  try {
    const result = await promisePool.query(sql);
    return result;
  } catch (error) {
    console.error('removeUser', error.message);
    throw new Error('Database error ' + error.message);
  }
};

export {
  fetchMediaItems,
  fetchMediaItemById,
  addMediaItem,
  updateMediaItem,
  removeItem,
  fetchUsers,
  fetchUserItemById,
  addUser,
  updateUser,
  removeUser,
};
