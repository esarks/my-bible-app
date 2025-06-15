#!/bin/bash

# Exit on error
set -e

DEFAULT_MESSAGE="Update all changes"
COMMIT_MESSAGE=${1:-$DEFAULT_MESSAGE}

echo "📥 Pulling latest from origin..."
git pull

echo "📂 Staging all changes..."
git add .

if git diff --cached --quiet; then
  echo "🟡 No changes to commit."
else
  echo "💾 Committing changes with message: \"$COMMIT_MESSAGE\""
  git commit -m "$COMMIT_MESSAGE"

  BRANCH=$(git rev-parse --abbrev-ref HEAD)

  echo "🚀 Pushing to branch: $BRANCH"
  git push origin "$BRANCH"

  echo "✅ All changes committed and pushed!"
fi
