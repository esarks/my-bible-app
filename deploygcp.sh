#!/bin/bash

set -e  # Stop on error

PROJECT_ID="my-bible-app-462322"
REGION="us-central1"
BACKEND_SERVICE="mybible-backend"
FRONTEND_SERVICE="mybible-frontend"
SUPABASE_DB_URL="postgresql://postgres:mybibleapp123@aws-0-us-east-2.pooler.supabase.com:6543/postgres"

echo "⚙️ Setting project..."
gcloud config set project "$PROJECT_ID"

echo "🧹 Normalizing line endings (LF only)..."
find ./backend ./frontend -type f \
  \( -name "*.js" -o -name "*.json" -o -name "*.ts" -o -name "*.yml" -o -name "*.sh" -o -name "Dockerfile*" \) \
  -exec dos2unix {} \; || echo "No files to convert"

echo "📦 Building backend..."
gcloud builds submit ./backend --tag "gcr.io/$PROJECT_ID/$BACKEND_SERVICE"

echo "🚀 Deploying backend..."
gcloud run deploy "$BACKEND_SERVICE" \
  --image "gcr.io/$PROJECT_ID/$BACKEND_SERVICE" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated \
  --set-env-vars "DATABASE_URL=$SUPABASE_DB_URL"

echo "📦 Building frontend..."
gcloud builds submit ./frontend --tag "gcr.io/$PROJECT_ID/$FRONTEND_SERVICE"

echo "🚀 Deploying frontend..."
gcloud run deploy "$FRONTEND_SERVICE" \
  --image "gcr.io/$PROJECT_ID/$FRONTEND_SERVICE" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated

echo "✅ Deployment complete!"
