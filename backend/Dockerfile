# Use Node.js 20 as the base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Remove devDependencies to reduce size
RUN npm prune --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the port that Cloud Run expects
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
