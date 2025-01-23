# Network Builder

## Description

This is a simple web application to make network, participate chapter specific events and group chat functionlity

## features

- Login, signup
- Group chat
- Event create, read, update, delete
- Rsvp events 
- Profile manangement

## Technologies Used

- Node.js
- Express.js
- React.js
- MongoDB
- Socket IO

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/adarshjithu/NETWORK-BUILDER-APP.git


3.Setting up environmental variables

- Create a file .env
- Add environmental variables inside .env

  
2.Install dependency for backend and run
   
-  cd backend
-  npm install
-  cd/dist 
-  node index.js

4.Install dependency for frontend and run
 
- cd frontend
- npm install
- npm run dev

## API DOCUMENTATION

1. Purpose

This API enables developers to manage users, handle authentication, and perform CRUD operations for user data, events and group chat

2.Base URL:  http://localhost:3000

- Base URL:  http://localhost:3000

## Authentication



### 1. User login

- **Endpoint:** `POST /api/auth/login`
- **Description:** Fetches a list of all registered users.
-  Authenticates a user and sets the JWT in an HTTP-only cookie.
 #### Headers:
- `Content-Type: application/json`

 #### Request Body:
 ```json
 {
  "email": "user@example.com",
  "password": "yourpassword123"
 }


### 2. User Signup

- **Endpoint:** `POST /api/auth/register`  
- **Description:** Registers a new user and returns the user details upon successful 
   Authenticates a user and sets the JWT in an HTTP-only cookie.signup.

#### Headers:
- `Content-Type: application/json`

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "yourpassword123",
  "confirmPassword": "yourpassword123",
  "chapter":"Tech"
}

### 3. User Lougout

- **Endpoint:** `GET /api/auth/logout`  
- **Description:** Logout current user remove access token and refresh token from the cookies.

#### Headers:
- `Content-Type: application/json`

#### Response Body:
```json
{
  "success": "true",
  "message":"User logout successfull"
   
}

### 4. Refresh access token when expires

- **Endpoint:** `GET /api/auth/refresh_token`  
- **Description:** Every 5 minutes access token get expires and call the api to get new access token using refresh token.

#### Headers:
- `Content-Type: application/json`

#### Response Body:
```json
{
  "success": "true",
  "accessToken":"newAccessToken"
   
}



## Chat APIs

- Purpose

This API enables developers to manage group chat. It uses to create a new group, search groups, join groups, and save and get all messages in a group



### 1. Create new group 

- **Endpoint:** `POST /api/chat/group`
- **Description:** For creating a new group.

 #### Headers:
- `Content-Type: application/json`

 #### Request Body:
 ```json
 {
  "groupname": "samplegroup",
  "groupdescription": "sampleDescription"
 }


### 2. Get all groups

- **Endpoint:** `GET /api/chat/groups`
- **Description:** For getting all group information for a user.
- For accessing the api need secure authentication

 #### Headers:
- `Content-Type: application/json`


 #### Response Body:
 ```json
 [{
   "_id":"123",
  "groupname": "samplegroup",
  "groupdescription": "sampleDescription",
  "admin":"adminId",
  "private":"false",
  "pinnedmessage":"pinned message",
  "members":[],
  "createdAt":2025-01-22T14:54:42.720+00:00,
  "updatedAt":2025-01-22T14:54:42.720+00:00

 }]




### 3. Search groups 

- **Endpoint:** `GET /api/chat/groups/search?query=query`
- **Description:** For searching a group with query
- For accessing the api need secure authentication

 #### Headers:
- `Content-Type: application/json`


 #### Response Body:
 ```json
 [{
   "_id":"123",
  "groupname": "samplegroup",
  "groupdescription": "sampleDescription",
  "admin":"adminId",
  "private":"false",
  "pinnedmessage":"pinned message",
  "members":[],
  "createdAt":2025-01-22T14:54:42.720+00:00,
  "updatedAt":2025-01-22T14:54:42.720+00:00

 }]



### 4. For joining a group

- **Endpoint:** `POST /api/chat/group/join`
- **Description:** For joining a new group.

 #### Headers:
- `Content-Type: application/json`

 #### Request Body:
 ```json
 {
  "groupId": "12345678",
  
 }

  #### Response Body:
 ```json
 [{
   "_id":"123",
  "groupname": "samplegroup",
  "groupdescription": "sampleDescription",
  "admin":"adminId",
  "private":"false",
  "pinnedmessage":"pinned message",
  "members":[],
  "createdAt":2025-01-22T14:54:42.720+00:00,
  "updatedAt":2025-01-22T14:54:42.720+00:00

 }]


### 5. Get messages for a particular group

- **Endpoint:** `GET /api/chat/group/messages/:groupId`
- **Description:** For getting all conversation happened inside a group
- For accessing the api need secure authentication

 #### Headers:
- `Content-Type: application/json`


 #### Response Body:
 ```json
 [{
   "_id":"67905cd75e1e9ee410863fb3",
  "senderId": "67905cd75e1e9ee410863fb3",
  "groupId": "67905cd75e1e9ee410863fb3",
  "message":"sample message",
  "isRead":[],
  "messgeType":"text",
  "attachments":[],
  "createdAt":2025-01-22T14:54:42.720+00:00,
  "updatedAt":2025-01-22T14:54:42.720+00:00

 }]




## Profile APIs

- Purpose

This API enables developers to manage user profile chat. It enables to create, read, update, and edit user profile

### 1. Create new Profile 

- **Endpoint:** `POST /api/user/profile`
- **Description:** For creating a new profile.

 #### Headers:
- `Content-Type: application/json`

 #### Request Body:
 ```json
 {
  "name": "Adarsh",
  "companyname": "dummy company name",
  "industry":"Tech",
  "phone":"1234556789",
  "email":"sample@gmail.com",
  "website":"samplewebsite",
  "socialmedialinks":{"facebook":"facebook.com"},
  "dob":"15/02/1997",
  "googlemappins":"googlemappins",
  "emergencynumber":"199",
  "joiningdate":2025-01-22T14:54:42.720+00:00,
  "renewaldate":2025-01-22T14:54:42.720+00:00,
  "userId":"67905cd75e1e9ee410863fb3"
 }


### 2. Get user profile 

- **Endpoint:** `GET /api/user/profile`
- **Description:** For fetching user profile.
- After secure authentication we can access userId from req.userId;

 #### Headers:
- `Content-Type: application/json`

#### Response Body:
 ```json
 {"_id":"67905cd75e1e9ee410863fb3",
  "name": "Adarsh",
  "companyname": "dummy company name",
  "industry":"Tech",
  "phone":"1234556789",
  "email":"sample@gmail.com",
  "website":"samplewebsite",
  "socialmedialinks":{"facebook":"facebook.com"},
  "dob":"15/02/1997",
  "googlemappins":"googlemappins",
  "emergencynumber":"199",
  "joiningdate":2025-01-22T14:54:42.720+00:00,
  "renewaldate":2025-01-22T14:54:42.720+00:00,
  "userId":"67905cd75e1e9ee410863fb3",
    "createdAt":2025-01-22T14:54:42.720+00:00,
  "updatedAt":2025-01-22T14:54:42.720+00:00
 }


### 2. Delete user profile 

- **Endpoint:** `DELETE /api/user/profile`
- **Description:** For deleting user profile.
- After secure authentication we can access userId from req.userId;

 #### Headers:
- `Content-Type: application/json`

#### Response Body:
 ```json

{"success": true, "message": "Your profile has been deleted successfully" }
 




 ## Event APIs

- Purpose

This API enables developers to manage event related functionalities. It enables to create, read, update,rsvp,cancel rsvp , and edit events





### 1. Create new event 

- **Endpoint:** `POST /api/user/event`
- **Description:** For creating a new event.

 #### Headers:
- `Content-Type: application/json`

 #### Request Body:
 ```json
 {
  "title": "Event title",
  "description": "sampleDescription",
  "location":"kerala",
  "date":2025-01-28T18:30:00.000+00:00,
  "region":"India",
  "chapter":"Tech"
 }


 
### 2. Get all events 

- **Endpoint:** `GET /api/user/events`
- **Description:** For getting all events according to user chapter admin

 #### Headers:
- `Content-Type: application/json`

 #### Response Body:
 ```json
 [{
   "_id":"67905cd75e1e9ee410863fb3",
  "title": "Event title",
  "description": "sampleDescription",
  "location":"kerala",
  "date":2025-01-28T18:30:00.000+00:00,
  "region":"India",
  "chapter":"Tech",
     "createdAt":2025-01-22T14:54:42.720+00:00,
  "updatedAt":2025-01-22T14:54:42.720+00:00
  
 }]



### 2. RSVP a event

- **Endpoint:** `PATCH /api/user/event`
- **Description:** For rsvp event

 #### Headers:
- `Content-Type: application/json`

 #### Request Body:
 ```json
 [{"eventId":"1234234"}]


### 2. Delete a event

- **Endpoint:** `DELETE /api/user/event/:eventId`
- **Description:** For deleting an event

 #### Headers:
- `Content-Type: application/json`

 #### Response Body:
 ```json
 [{"success":true,"message":"Rsvp successfull"}]


### 2. Update a event

- **Endpoint:** `PUT /api/user/event`
- **Description:** For updating an event

 #### Headers:
- `Content-Type: application/json`

 #### Request  Body:
 ```json
{
   "_id":"67905cd75e1e9ee410863fb3",
  "title": "Event title",
  "description": "sampleDescription",
  "location":"kerala",
  "date":2025-01-28T18:30:00.000+00:00,
  "region":"India",
  "chapter":"Tech",
     "createdAt":2025-01-22T14:54:42.720+00:00,
  "updatedAt":2025-01-22T14:54:42.720+00:00
  
 }


 #### Response  Body:
 ```json

 {"success":true,"message":"The event has been updated successfully"}



///////////////////////////////