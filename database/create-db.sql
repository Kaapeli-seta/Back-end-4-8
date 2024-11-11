DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp()
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);

-- FK constraint fails, user_id 1606 does not exist
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', '', 1606, 'image/jpeg');

-- Inserting multiple records at once
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg'),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');

SELECT * FROM MediaItems;
SELECT * FROM Users;

CREATE TABLE MediaFolderStatus (
  folder_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  foldername VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  folder_status VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE MediaText (
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  text_data TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (media_id),
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


INSERT INTO MediaText (media_id, text_data, title, description, user_id) 
  VALUES (2, 'Some long text data here', 'Favorite drink', null, 305),
         (3, 'More text to store in the database, that can be retrieved later if wanted to whether one wishes to do so', 'Miika', 'My Photo', 305),
         (4, 'Some unknown things', 'Aksux and Jane', 'friends', 260);


INSERT INTO MediaFolderStatus (user_id, foldername, filesize, folder_status)
  VALUES(260,'Folder1',0,'Empty'),
        (305,'Picture', 4560, 'Active'),
        (305,'Scripts', 870, 'Timeout'),
        (260,'Folder2', 5405, 'Disabled');

SELECT * FROM MediaFolderStatus;
SELECT * FROM MediaText;
