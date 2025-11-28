# Formix — Full-Stack Form Builder and Response Management System

Formix is a full-stack web application built to let users create custom forms, publish them as shareable links, and collect responses in a structured way.
It is inspired by tools like Google Forms, but designed as a self-hosted system where the entire workflow — from authentication to data storage — is under your control.

The main focus of this project is not just UI, but proper backend design, data integrity, and real-world access control.

## What You Can Do With Formix

With this application, users can:

* Create an account and log in securely
* Build custom forms using multiple question types
* Add descriptions and configure options for each field
* Publish forms and generate shareable public links
* Collect responses from anyone without requiring login
* View and manage responses inside a private dashboard
* Access only their own forms and data

---

## Technology Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Environment-based configuration
* JWT handling in browser storage

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT authentication
* bcrypt for password hashing
* Environment configuration with dotenv
* CORS and security middleware

---

## Project Structure

### Frontend

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── form-builder/
│   ├── App.jsx
│   └── main.jsx
```

### Backend

```
backend/
├── controllers/
├── routes/
├── models/
├── middleware/
├── utils/
├── server.js
└── .env
```

---

## Setup Guide

---

### 1. Clone the Repository

```
git clone https://github.com/your-username/formix.git
cd formix
```

---

### 2. Backend Setup

Move into the backend folder and install dependencies:

```
cd backend
npm install
```

Create a `.env` file inside the backend directory and add:

```
PORT=8080
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```
npm run dev
```

If everything is correct, you should see:

```
Server running on port 8080
MongoDB connected
```

---

### 3. Frontend Setup

Move into the frontend directory:

```
cd ../frontend
npm install
```

Create a `.env` file inside the frontend directory:

```
VITE_API_URL=http://localhost:8080
```

Start the frontend:

```
npm run dev
```

Open the application in your browser:

```
http://localhost:5173
```

---

## Authentication Flow

* Users register with email and password
* Passwords are hashed before storage
* Logging in returns a JWT token
* Protected routes require a valid token
* Backend verifies ownership for all private resources

---

## Form Builder Features

The form builder allows users to create fields such as:

* Name, Email, Mobile
* Short and long text inputs
* Date and date-of-birth
* Radio buttons and checkboxes
* Dropdown fields

Users can:

* Set character limits
* Limit date ranges
* Configure options for selection fields
* Publish and update forms

---

## Public Sharing

When a form is published:

* A shareable link is generated
* The link can be sent to anyone
* Responses are stored under the correct account
* No login is required to submit a form

---

## Response Management

* Form owners can view all submitted responses
* Responses are shown in a structured table format
* Only the owner of the form can access submission data
* Timestamps are recorded for every response

---

## API Overview

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Forms

```
POST   /api/forms/publish
GET    /api/forms/my
GET    /api/forms/public/:formId
DELETE /api/forms/:formId
```

### Responses

```
POST /api/responses/:formId
GET  /api/responses/:formId
```

### Dashboard

```
GET /api/dashboard/summary
```

---

## Why This Project Exists

Most form builder projects focus only on frontend design.
This project was built to practice:

* Secure authentication
* Ownership-based access
* Database relationships
* Clean controller logic
* Safe API structure
* End-to-end full-stack flow

It is intended as a real engineering project, not a demo UI.

---

## Author

Rajdeep Pal
Department of Computer Science
Ramakrishna Mission Vivekananda Centenary College

---

## License

MIT License

---

## Future Work

Planned improvements:

* Export responses as CSV
* Edit published forms
* Email notifications
* Admin controls
* Validation rules
* Response charts

---