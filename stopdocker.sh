#!/bin/bash

echo "🛑 Stopping all running containers..."
docker ps -q | xargs -r docker stop

echo "🧹 Removing stopped containers..."
docker ps -a -q | xargs -r docker rm

echo "✅ All containers stopped and removed."
