# Product Management System

A full-stack web application for managing products with React frontend and Node.js backend.

## Features

- User authentication and authorization
- CRUD operations for products
- Image URL validation and preview
- Responsive design
- Form validation
- Error handling

## Tech Stack

### Frontend
- React (Vite)
- Styled Components
- React Hook Form
- Axios
- React Router DOM
- FontAwesome Icons

### Backend
- Node.js
- Express.js
- MySQL2
- JSON Web Tokens
- CORS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- Git

### Installation

1. Clone the repository
bash
git clone <repository-url>


2. Install Backend Dependencies
bash
cd product-management/backend
npm install

3. Install Frontend Dependencies
bash
cd ../frontend
npm install

4. Configure Environment Variables
Create a `.env` file in the backend directory:
env
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-jwt-secret

5. Start the Backend Server
bash
cd ../backend
npm run dev

6. Start the Frontend Development Server
bash
cd ../frontend
npm run dev


## API Endpoints

### Authentication
- POST `/api/login` - User login

### Products
- GET `/api/products` - Get all products
- POST `/api/products` - Add new product
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product
- GET `/api/images` - Get available images

## Deployment

### Backend Deployment (Render.com)

1. Create a new account on [Render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the deployment:
   - Name: your-app-name
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: Add all your .env variables
5. Click "Create Web Service"

### Environment Variables on Render
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
- `PORT`


