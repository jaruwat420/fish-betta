# Ore-o Full-Stack Application

A modern full-stack application built with Next.js, NestJS, and MongoDB.

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Containerization**: Docker & Docker Compose

## Project Structure

```
ore-o/
├── frontend/          # Next.js frontend application
├── backend/           # NestJS backend API
├── docker-compose.yml # Full Docker setup for production
├── docker-compose.dev.yml # MongoDB only for development
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose (for MongoDB setup)
- npm or yarn

### Option 1: Docker Setup (Recommended)

#### Quick Start with Docker

1. **Clone and setup environment:**
   ```bash
   # Copy environment file and configure
   cp .env.example .env
   # Edit .env with your preferred credentials
   ```

2. **Start only MongoDB (for local development):**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   npm run install:all
   npm run dev
   ```

3. **Start full stack with Docker:**
   ```bash
   docker-compose up -d
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- MongoDB: mongodb://admin:password123@localhost:27017

### Option 2: Local Development Setup

#### 1. Install Dependencies

```bash
# Install all dependencies for both frontend and backend
npm run install:all
```

#### 2. Environment Setup

Copy the environment template:
```bash
cp .env.example .env
```

The main `.env` file contains:
```env
# Database Connection
MONGODB_URI=mongodb://admin:password123@localhost:27017/ore-o?authSource=admin

# Application
PORT=3001
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001

# Docker MongoDB Credentials
MONGODB_INITDB_ROOT_USERNAME=admin
MONGODB_INITDB_ROOT_PASSWORD=password123
MONGODB_INITDB_DATABASE=ore-o
```

#### 3. Start MongoDB with Docker

```bash
# Start only MongoDB for local development
docker-compose -f docker-compose.dev.yml up -d
```

#### 4. Start Development Servers

```bash
# Start both frontend and backend in parallel
npm run dev

# Or start individually:
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:3001
```

### Option 3: Production Docker Setup

```bash
# Build and start all services in production mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Environment Variables

### Required Environment Variables

Create `.env` file from `.env.example`:

- **MONGODB_URI**: MongoDB connection string with authentication
- **MONGODB_INITDB_ROOT_USERNAME**: MongoDB admin username
- **MONGODB_INITDB_ROOT_PASSWORD**: MongoDB admin password
- **MONGODB_INITDB_DATABASE**: Initial database name
- **PORT**: Backend server port (default: 3001)
- **NEXT_PUBLIC_API_URL**: Frontend API URL (default: http://localhost:3001)

## Database Setup

### MongoDB Docker Configuration

The Docker setup includes:

1. **MongoDB Instance**: Configured with authentication
2. **Database Initialization**: Creates initial database and user
3. **Volume Persistence**: Data persists across container restarts
4. **Network Isolation**: Secure internal network communication

### Connecting to MongoDB

You can connect to the MongoDB instance using:

- **Connection String**: `mongodb://admin:password123@localhost:27017/ore-o?authSource=admin`
- **GUI Tools**: MongoDB Compass, Studio 3T, etc.
- **CLI**: `docker exec -it ore-o-mongodb mongo`

## API Endpoints

The backend API provides the following endpoints:

- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get a specific user by ID

## Docker Services

### Development Services (`docker-compose.dev.yml`)
- **mongodb**: MongoDB instance with persistent data

### Production Services (`docker-compose.yml`)
- **mongodb**: MongoDB instance
- **backend**: NestJS API server
- **frontend**: Next.js application server

## Features

- ✅ User management with CRUD operations
- ✅ MongoDB integration with Mongoose
- ✅ TypeScript support
- ✅ Responsive UI with Tailwind CSS
- ✅ Docker containerization
- ✅ Environment configuration
- ✅ Database authentication
- ✅ Volume persistence
- ✅ Development and production setups
- ✅ Hot module reload in development

## Development Workflow

The application includes a sample user management feature where you can:

1. Add new users with name and email
2. View a list of all users
3. Users are stored in MongoDB database with authentication

## Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run build` - Build both applications for production
- `npm run install:all` - Install dependencies for all packages

## Docker Commands

```bash
# Development (MongoDB only)
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down

# Production (Full stack)
docker-compose up -d --build
docker-compose down
docker-compose logs -f [service-name]
docker-compose exec [service-name] [command]
```

## License

MIT