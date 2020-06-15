# fancy-todo
Membuat sebuah website fancy todo

RESTful endpoints
GET /assets
Get all assets

Request Header

{
  "access_token": "<your access token>"
}
Request Body

not needed
Response (200)

[
  {
    "id": 1,
    "name": "<asset name>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<asset name>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
Response (400 - Bad Request)

{
  "message": "Invalid request"
}
POST /assets
Create new asset

Request Header

{
  "access_token": "<your access token>"
}
Request Body

{
  "name": "<name to get insert into>",
  "description": "<description to get insert into>"
}
Response (201 - Created)

{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response (400 - Bad Request)

{
  "message": "Invalid requests"
}