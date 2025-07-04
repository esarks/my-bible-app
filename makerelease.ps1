
param(
  [Parameter(Mandatory=$true)]
  [string]$ReleaseTag,

  [Parameter(Mandatory=$true)]
  [string]$Description
)

# Optional: Validate GitHub CLI
if (-not (Get-Command "gh" -ErrorAction SilentlyContinue)) {
  Write-Error "❌ GitHub CLI (gh) is not installed. Get it from https://cli.github.com/"
  exit 1
}

Write-Host "📦 Creating GitHub release: $ReleaseTag"
Write-Host "📝 Description: $Description"

# Create release with same title as tag
gh release create $ReleaseTag `
  --title "$ReleaseTag" `
  --notes "$Description"

Write-Host "✅ Release '$ReleaseTag' created successfully."
