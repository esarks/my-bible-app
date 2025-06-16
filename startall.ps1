Write-Host "Stopping and removing existing containers..."
docker-compose down --remove-orphans

Write-Host "Rebuilding services (frontend and backend)..."
docker-compose build --no-cache

Write-Host "Starting containers..."
docker-compose up
