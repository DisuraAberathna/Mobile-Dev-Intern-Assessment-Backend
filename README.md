# Backend - Course App API

Node.js + Express backend for the Course App Mobile Dev Intern Assessment.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Google Gemini API integration
- Nodemailer email notifications

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_key
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
MAIL_FROM=no-reply@courseapp.com
```

3. (Optional) Seed database:

```bash
npm run seed
```

4. Start development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start with nodemon
- `npm start` - Start with node
- `npm run seed` - Seed initial users and courses

## API Overview

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/profile`

### Courses

- `GET /course`
- `GET /course/:id`
- `POST /course`
- `PUT /course/:id`
- `DELETE /course/:id`
- `GET /course/instructor/my-courses`

### Enrollment

- `POST /course/:id/enroll`
- `GET /course/my-enrolled`

### AI

- `POST /gemini/recommendations`
