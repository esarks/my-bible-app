#!/bin/bash

echo "🛑 Stopping and removing existing containers..."
docker-compose down --remove-orphans

echo "🔧 Rebuilding services (frontend and backend)..."
docker-compose build --no-cache

echo "🚀 Starting containers..."
docker-compose up
