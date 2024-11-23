import {querryPool} from '../../utils/functions.js';

const fetchUsers = async () => {
  const sql = 'SELECT * FROM Users';
  const [rows] = await querryPool(sql);
  return rows;
};

const fetchUserById = async (id) => {
  const sql = 'SELECT * FROM Users WHERE user_id = ?';
  const [rows] = await querryPool(sql, [id]);
  return rows;
};

const fetchUserByUsernameAndPassword = async (username, password) => {
  const sql =
    'SELECT user_id, username, email, user_level_id, created_at FROM Users WHERE username = ? AND password = ?';
  const [rows] = await querryPool(sql, [username, password]);
  return rows[0];
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

const updateUser = async (id, user_id, updatedUser) => {
  console.log(id, user_id);
  if (id != user_id) {
    return 2;
  }
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

const removeUser = async (id, user_id) => {
  if (id != user_id) {
    return 2;
  }
  const sql = `DELETE FROM users WHERE user_id = ${id}`;
  const result = await querryPool(sql);
  return result;
};

export {
  fetchUsers,
  fetchUserById,
  fetchUserByUsernameAndPassword,
  addUser,
  updateUser,
  removeUser,
};
