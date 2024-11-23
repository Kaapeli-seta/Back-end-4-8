import {querryPool} from '../../utils/functions.js';

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

const updateMediaItem = async (id, user_id, updatedItem) => {
  const sql1 = 'SELECT user_id FROM MediaItems WHERE media_id = ?';
  const [item_owner] = await querryPool(sql1, [id]);

  console.log('user_id:' + user_id, 'owner_id:' + item_owner[0].user_id);
  if (user_id != item_owner[0].user_id) {
    console.log('user not item owner');
    return 2;
  }

  const sql2 = `UPDATE MediaItems SET title = ?, description = ? WHERE media_id = ?`;
  const params = [updatedItem.title, updatedItem.description, id];
  const result = await querryPool(sql2, params);
  return result[0].affectedRows;
};

const removeItem = async (id, user_id) => {
  const sql1 = 'SELECT user_id, filename FROM MediaItems WHERE media_id = ?';
  const [item_data] = await querryPool(sql1, [id]);

  console.log('user_id:' + user_id, 'owner_id:' + item_data[0].user_id);
  if (user_id != item_data[0].user_id) {
    console.log('user not item owner');
    return 2;
  }
  const sql = `DELETE FROM mediaitems WHERE media_id = ${id}`;
  await querryPool(sql);
  return item_data[0];
};

export {
  fetchMediaItems,
  fetchMediaItemById,
  addMediaItem,
  updateMediaItem,
  removeItem,
};
