# 🔐 User Authentication & Authorization with Bearer Token

## 📌 Project Overview

This project implements **User Authentication and Authorization** using **JWT (Bearer Token)** in a Node.js application. It follows the **MVC architecture** and uses **MongoDB** for data storage.

The application allows users to:

* Register securely
* Login and receive a JWT token
* Access protected routes using the token

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* bcrypt (Password Hashing)
* JSON Web Token (JWT)
* Postman (API Testing)

---

## 📁 Project Structure (MVC)

```
project-root/
│
├── models/
│   └── user.schema.js
│
├── controllers/
│   └── user.controller.js
│
├── routes/
│   └── user.routes.js
│
├── middleware/
│   └── auth.middleware.js
│
├── database/
│   └── config.js
│
├── .env
├── index.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-github-repo-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file and add:

```
PORT
MONGO_URI
JWT_SECRET
```

### 4. Run the server

```bash
npm start
```

Server will run at:

```
http://localhost:2000
```

---

## 🔑 API Endpoints

### 📝 1. Register User

* **URL:** `/api/users/register`
* **Method:** `POST`

#### Request Body:

```json
{
  "username": "Rubesh",
  "email": "rubesh@gmail.com",
  "password": "123456"
}
```

#### Response:

```json
{
  "message": "User registered successfully"
}
```

---

### 🔐 2. Login User

* **URL:** `/api/users/login`
* **Method:** `POST`

### 🔐 3. Get User Info (Protected Route)

* **URL:** `/api/users/getUser`
* **Method:** `GET`
* **Headers:**

```
Authorization: Bearer <token>
```

#### Response:

```json
{
  "email": "rubesh@gmail.com",
  "password": "runesh"
}
```

#### Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWRjYmM2NTk4YzYzYTI3NWYyZmFiNWQiLCJpYXQiOjE3NzYwNzM4MzMsImV4cCI6MTc3NjA3NzQzM30.YOXIsM02AnzDYIhNaHoqUmJ5sfQGH9xM5DtYdUZ19Jw"
}
```

---

### 👤 3. Get User Info (Protected Route)

* **URL:** `/api/users`
* **Method:** `GET`
* **Headers:**

```
Authorization: Bearer <token>
```

#### Response:

```json
{
  "user": {
    "id": "user_id",
    "email": "rubesh@gmail.com"
  }
}
```

---

## 🔒 Authentication Flow

1. User registers → password is hashed using bcrypt
2. User logs in → credentials are verified
3. JWT token is generated and sent to client
4. Client sends token in Authorization header
5. Middleware verifies token and allows access

---

## 🧠 Middleware (JWT Verification)

* Extract token from headers
* Verify using `JWT_SECRET`
* Decode user data
* Attach user info to `req.user`

---

## ⚠️ Error Handling

* Invalid credentials → `401 Unauthorized`
* Missing token → `403 Forbidden`
* Server errors → `500 Internal Server Error`

---

## 🧪 Testing with Postman

1. Register a user
2. Login and copy the token
3. Use token in Authorization header:

   ```
   Bearer <your_token>
   ```
4. Access protected route

---

## 🌐 Deployment

* Deploy backend using Render
* Add environment variables in Render dashboard

---

## 📤 Submission

* Push code to GitHub
* Deploy using Render
* Submit:

  * GitHub Repository URL
  * Render Live URL

---

## ✍️ Author

Rubesh Kumar

---

## 📄 License

This project is for educational purposes.
