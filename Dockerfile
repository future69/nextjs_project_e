# Use official Node.js image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the entire project
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
