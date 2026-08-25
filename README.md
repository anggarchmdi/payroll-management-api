# Payroll Management API

REST API for a simple payroll management system built with Express.js and TypeScript.

This project is created as a fullstack development and backend security practice project.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MariaDB
- MySQL2
- JWT
- bcryptjs
- Zod
- Helmet
- CORS
- Express Rate Limit
- Swagger / OpenAPI

## Features

### Authentication

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Authentication middleware
- Role-based authorization
- Protected API routes
- Authentication rate limiting

### Employee Management

- Get all employees
- Get employee by ID
- Create employee
- Update employee
- Delete employee

### Attendance Management

- Get all attendance records
- Get attendance by ID
- Get personal attendance
- Create attendance
- Update attendance
- Delete attendance

### Payroll Management

- Get all payroll records
- Get payroll by ID
- Get personal payroll
- Create payroll
- Update payroll
- Delete payroll

### API Documentation

Swagger UI is available at:

`http://localhost:5000/api-docs`

## Authentication

This API uses JWT Bearer Authentication.

After logging in, copy the JWT token and use it in the Swagger `Authorize` button:

```text
Bearer YOUR_JWT_TOKEN


How to use?

1. git clone https://github.com/anggarchmdi/payroll-management-api.git
2. cd payroll-management-api
3. npm install
4. cp .env.example .env
(Configure the database and environment variables in .env.)
5. npm run dev

The API will run on:
http://localhost:5000


## Database Setup

This project uses MariaDB.

Create the database and tables using the SQL schema:

```bash
mysql -u root -p < database/schema.sql

Then configure the database credentials in .env:
DB_HOST=localhost
DB_PORT=3306
DB_USER=payroll_app
DB_PASSWORD=your_password
DB_NAME=payroll_db

For development seed data:
mysql -u root -p payroll_db < database/seed.sql
