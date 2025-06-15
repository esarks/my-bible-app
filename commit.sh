#!/bin/bash

# Exit on error
set -e

# Set your commit message
DEFAULT_MESSAGE="Update all changes"
COMMIT_MESSAGE=${1:-$DEFAULT_MESSAGE}

echo "Staging all changes..."
git add .

# Check if there is anything to commit
if git diff --cached --quiet; then
  echo "🟡 No changes to commit."
else
  echo "Committing changes with message: \"$COMMIT_MESSAGE\""
  git commit -m "$COMMIT_MESSAGE"

  # Detect current branch
  BRANCH=$(git rev-parse --abbrev-ref HEAD)

  echo "Pushing to branch: $BRANCH"
  git push origin "$BRANCH"

  echo "✅ All changes committed and pushed!"
fi
