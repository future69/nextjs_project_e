Project Info:

Project E is a simple SaaS dashboard for expense management built with Next.js and PostgreSQL. The app allows users to manage their expenses, register new users, and track their spending.

Prerequisites
Before you begin, make sure you have the following installed:

Docker and Docker Compose
Node.js (if you want to build locally without Docker)
PostgreSQL (if running the database outside Docker)

1. Running the Project
   Using Docker

   Please paste .env file into root directory (nextjs_project_e)

   In the project root directory, run the following command:
   docker-compose up --build

2. Setup and Installation (If Required)
   Install project dependencies:
   pnpm install

This will build the Docker images and start the containers for both the Next.js app and PostgreSQL database.

Once the containers are up, open http://localhost:3000/login in your browser to access the app.

1. Demo Account
   email: alice@example.com
   password: hashedpassword1

Running the App Locally
If you want to run the app outside of Docker, follow these steps:

Install dependencies:
pnpm install

Run the development server:
pnpm run dev
Access the app at http://localhost:3000/login.

Database Setup
The app uses PostgreSQL to store user and expense data. The database is set up and populated automatically when you run the app via Docker.

Initial Database Schema
The following tables are created:

users: Stores user information (email and password hash).
expenses: Stores expenses linked to users, including descriptions, amounts, and dates.
You can see the schema defined in db.sql, which is run on database startup.

Database Migration
If you need to migrate the database manually (outside of Docker), you can run the SQL queries defined in db.sql on your PostgreSQL database.

Environment Variables
This project requires the following environment variables:

env
Copy
Edit
POSTGRES_URL="postgres://postgres:admin@localhost:5432/project_e_db"
SESSION_SECRET="your-session-secret"
Make sure to replace SESSION_SECRET with a strong secret key. You can place these in a .env file in the root of your project.

Docker Usage
If you want to run this project in a Docker container, make sure the following files are in place:

docker-compose.yml: Defines the services (app and database).
Dockerfile: Describes the build process for the app.
db.sql: Initializes the PostgreSQL database schema and seed data.
To share the Docker image, you can push it to a Docker registry like Docker Hub:

License
This project is licensed under the MIT License - see the LICENSE file for details.
