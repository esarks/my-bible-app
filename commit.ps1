
# Exit on first error
$ErrorActionPreference = "Stop"

# Default commit message
$DEFAULT_MESSAGE = "Update all changes"
$COMMIT_MESSAGE = if ($args.Count -gt 0) { $args[0] } else { $DEFAULT_MESSAGE }

Write-Host "📥 Pulling latest from origin..."
git pull

Write-Host "📂 Staging all changes..."
git add .

# Check if there are staged changes
$changes = git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "🟡 No changes to commit."
} else {
    Write-Host "💾 Committing changes with message: `"$COMMIT_MESSAGE`""
    git commit -m "$COMMIT_MESSAGE"

    $BRANCH = git rev-parse --abbrev-ref HEAD

    Write-Host "🚀 Pushing to branch: $BRANCH"
    git push origin $BRANCH

    Write-Host "✅ All changes committed and pushed!"
}
