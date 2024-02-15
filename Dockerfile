# Use a base image with Node.js installed
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if using npm) or yarn.lock (if using Yarn)
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
