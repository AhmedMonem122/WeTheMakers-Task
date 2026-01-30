# API Integration Guide

## Overview
This document describes the backend API requirements for the Job Board Mobile App.

## Base Configuration
```typescript
// lib/api.ts
export const API_BASE_URL = 'http://your-backend-url/api';
```

## Authentication

All authenticated requests must include:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker",
    "createdAt": "2024-01-30T10:00:00Z"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker",
    "createdAt": "2024-01-30T10:00:00Z"
  }
}
```

### Jobs

#### Get All Jobs
```http
GET /jobs
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "job_123",
    "title": "Senior React Native Developer",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "type": "Full-time",
    "salary": "$120k - $180k",
    "description": "We are looking for...",
    "requirements": "5+ years experience...",
    "postedBy": "admin_123",
    "createdAt": "2024-01-30T10:00:00Z",
    "updatedAt": "2024-01-30T10:00:00Z"
  }
]
```

#### Get Single Job
```http
GET /jobs/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "job_123",
  "title": "Senior React Native Developer",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "type": "Full-time",
  "salary": "$120k - $180k",
  "description": "We are looking for...",
  "requirements": "5+ years experience...",
  "postedBy": "admin_123",
  "createdAt": "2024-01-30T10:00:00Z",
  "updatedAt": "2024-01-30T10:00:00Z"
}
```

#### Create Job (Admin Only)
```http
POST /jobs
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Senior React Native Developer",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "type": "Full-time",
  "salary": "$120k - $180k",
  "description": "We are looking for...",
  "requirements": "5+ years experience..."
}

Response: 201 Created
{
  "id": "job_123",
  "title": "Senior React Native Developer",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "type": "Full-time",
  "salary": "$120k - $180k",
  "description": "We are looking for...",
  "requirements": "5+ years experience...",
  "postedBy": "admin_123",
  "createdAt": "2024-01-30T10:00:00Z",
  "updatedAt": "2024-01-30T10:00:00Z"
}
```

#### Update Job (Admin Only)
```http
PUT /jobs/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "type": "Full-time",
  "salary": "$120k - $180k",
  "description": "Updated description...",
  "requirements": "Updated requirements..."
}

Response: 200 OK
{
  "id": "job_123",
  "title": "Updated Title",
  ...
  "updatedAt": "2024-01-30T11:00:00Z"
}
```

#### Delete Job (Admin Only)
```http
DELETE /jobs/:id
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "success": true,
  "message": "Job deleted successfully"
}
```

### Applications

#### Get My Applications
```http
GET /applications/my-applications
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "app_123",
    "jobId": "job_123",
    "userId": "user_123",
    "resume": "My resume text...",
    "coverLetter": "Dear hiring manager...",
    "status": "pending",
    "createdAt": "2024-01-30T10:00:00Z",
    "job": {
      "id": "job_123",
      "title": "Senior React Native Developer",
      "company": "Tech Corp"
    }
  }
]
```

#### Get Applications for Job (Admin Only)
```http
GET /applications/job/:jobId
Authorization: Bearer <admin_token>

Response: 200 OK
[
  {
    "id": "app_123",
    "jobId": "job_123",
    "userId": "user_123",
    "resume": "My resume text...",
    "coverLetter": "Dear hiring manager...",
    "status": "pending",
    "createdAt": "2024-01-30T10:00:00Z",
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
```

#### Submit Application
```http
POST /applications/:jobId
Authorization: Bearer <token>
Content-Type: application/json

{
  "resume": "My resume text with experience and education...",
  "coverLetter": "Dear hiring manager, I am writing to express..."
}

Response: 201 Created
{
  "id": "app_123",
  "jobId": "job_123",
  "userId": "user_123",
  "resume": "My resume text...",
  "coverLetter": "Dear hiring manager...",
  "status": "pending",
  "createdAt": "2024-01-30T10:00:00Z"
}
```

#### Update Application Status (Admin Only)
```http
PATCH /applications/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "reviewing"
}

Response: 200 OK
{
  "id": "app_123",
  "jobId": "job_123",
  "userId": "user_123",
  "resume": "My resume text...",
  "coverLetter": "Dear hiring manager...",
  "status": "reviewing",
  "createdAt": "2024-01-30T10:00:00Z"
}
```

Valid statuses: `pending`, `reviewing`, `accepted`, `rejected`

### Users

#### Get Job Seekers (Admin Only)
```http
GET /users/job-seekers
Authorization: Bearer <admin_token>

Response: 200 OK
[
  {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker",
    "createdAt": "2024-01-30T10:00:00Z"
  }
]
```

#### Get User by ID (Admin Only)
```http
GET /users/:id
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "job_seeker",
  "createdAt": "2024-01-30T10:00:00Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation Error",
  "message": "Invalid input data",
  "details": {
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## JWT Token Structure

The JWT token should include:
```json
{
  "userId": "user_123",
  "email": "john@example.com",
  "role": "job_seeker",
  "iat": 1706612400,
  "exp": 1706698800
}
```

## CORS Configuration

Ensure your backend allows:
```javascript
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Rate Limiting

Recommended rate limits:
- Authentication endpoints: 5 requests per minute
- General endpoints: 100 requests per minute
- Admin endpoints: 200 requests per minute

## Data Validation

### Job Type Values
Valid job types: `Full-time`, `Part-time`, `Contract`, `Internship`, `Remote`

### Application Status Values
Valid statuses: `pending`, `reviewing`, `accepted`, `rejected`

### User Role Values
Valid roles: `admin`, `job_seeker`

## Testing

Use tools like Postman or curl to test endpoints:

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get Jobs
curl http://localhost:3000/api/jobs \
  -H "Authorization: Bearer <your_token>"
```

## Notes

- All dates are in ISO 8601 format
- All IDs are strings
- Passwords must be hashed before storage (bcrypt recommended)
- JWT tokens should expire after 24 hours
- Refresh tokens are recommended for production
