# Media Sharing app example REST API application

## Installation

1. Clone
2. Run `npm install`
3. Create database
4. Create .env file (see `.env.sample`)

## Run

1. Run `npm run dev`

## comads

1. Get

To get all items in client send the request

```http
GET http://localhost:3000/api/media
```

To get specifict items in client send the request with an available item id

```http
GET http://localhost:3000/api/media/:id
```

For user data this is almost the same

```http
GET http://localhost:3000/api/user
```

```http
GET http://localhost:3000/api/user/:id
```

3. Post

Must post requests in this api require a user token to identify the user but creating a new user does not.
User data is posted in json format

```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "username": "username",
  "password": "password",
  "email": "email"
}
```

This does not however give you a user token. You need to check the user authentication first.

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "username": "Johan",
  "password": "veryGoodPasword"
}
```

once you have the token you may use it to post and modify that users items and user data.
Posting items to media works a little differently. The data is acsepted as multipart/form-data.
the data needed for this field is as folows:

- title
- description (optional)
- filename
  - with a specified content type

in Rest-client it would look something like this

```http
POST http://localhost:3000/api/media
Content-Type: multipart/form-data; boundary=----Boundary
Authorization: Bearer [token]

------Boundary
Content-Disposition: form-data; name="title"

[item title]
------Boundary
Content-Disposition: form-data; name="file"; filename="image.png"
Content-Type: image/png

< ./[filename].png
------Boundary--
```

4. Put
   Put works in a simular way to post.
   For media items you can currently only modify title and description
   keep in mid that to modify data the userdata needs to match.
   Meaning that a token ment for a another user will not work.

```http
PUT http://localhost:3000/api/media/16
Content-Type: multipart/form-data; boundary=----Boundary
Authorization: Bearer [token]
------Boundary
Content-Disposition: form-data; name="title"

[new title]
------Boundary
Content-Disposition: form-data; name="description"

[new description]
------Boundary--
```

For userdata you can modify usernam, password and email like this:

```http
PUT http://localhost:3000/api/users/[user_id]
Content-Type: application/json
Authorization: Bearer [token]

{
  "username": "username",
  "password": "password",
  "email": "email"
}
```

5. Delete
   Delete only need are the object specified in the query string and the owning users token

```http
DELETE http://localhost:3000/api/media/[id]
Authorization: Bearer [token]
```

```http
DELETE  http://localhost:3000/api/users/[id]
Authorization: Bearer [token]
```
