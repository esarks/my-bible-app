# Use Node.js LTS as the base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Validate server.js is in the final image (optional for debugging)
# RUN ls -l /usr/src/app

# Expose port 8080
EXPOSE 8080

# Run your app
CMD ["node", "server.js"]
