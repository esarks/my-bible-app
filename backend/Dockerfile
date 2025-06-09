# Use Node.js LTS as the base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Command to run the app
CMD ["node", "server.js"]

