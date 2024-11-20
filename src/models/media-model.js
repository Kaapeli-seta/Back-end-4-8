import promisePool from '../../utils/database.js';
// Dummy mock data

const fetchMediaItems = async () => {
  const sql = 'SELECT * FROM MediaItems';
  const [rows] = await querryPool(sql);
  return rows;
};

const fetchMediaItemById = async (id) => {
  const sql = 'SELECT * FROM MediaItems WHERE media_id = ?';
  const [rows] = await querryPool(sql, [id]);
  return rows;
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
  const result = await querryPool(sql, params);
  return result[0].insertId;
};

const updateMediaItem = async (id, updatedItem) => {
  const sql = `UPDATE MediaItems SET title = ?, description = ? WHERE media_id = ?`;
  const params = [updatedItem.title, updatedItem.description, id];
  const result = await querryPool(sql, params);
  return result[0].affectedRows;
};

const removeItem = async (id) => {
  const sql = `DELETE FROM mediaitems WHERE media_id = ${id}`;
  const result = await querryPool(sql);
  return result;
};

const fetchUsers = async () => {
  const sql = 'SELECT * FROM Users';
  const [rows] = await querryPool(sql);
  return rows;
};

const fetchUserItemById = async (id) => {
  const sql = 'SELECT * FROM Users WHERE user_id = ?';
  const [rows] = await querryPool(sql, [id]);
  return rows;
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
  const result = await querryPool(sql, params);
  return result[0].insertId;
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
  const result = await querryPool(sql, params);
  return result[0].affectedRows;
};

const removeUser = async (id) => {
  const sql = `DELETE FROM users WHERE user_id = ${id}`;
  const result = await querryPool(sql);
  return result;
};

async function querryPool(sql, params = []) {
  try {
    const result = await promisePool.query(sql, params);
    return result;
  } catch (error) {
    console.error('Debug', error.message);
    throw new Error('Database error ' + error.message);
  }
}

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
