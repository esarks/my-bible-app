# Use Node.js 20 as the base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY data/prisma ./prisma

# Copy the rest of the app (including .env!)
COPY . .

# Generate Prisma client **after** copying .env
RUN npx prisma generate

# Remove devDependencies to reduce image size
RUN npm prune --omit=dev

# Expose the port that Cloud Run expects
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
