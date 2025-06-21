# Uninstall global CLI
npm uninstall -g @plasmicapp/cli

# Remove global Plasmic binaries (PowerShell & CMD)
Remove-Item "$env:APPDATA\npm\plasmic*" -Force -Recurse -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\nnpm\plasmic.cmd" -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\npm\plasmic.ps1" -Force -ErrorAction SilentlyContinue

# Remove NPX cache folders
Remove-Item "$env:LOCALAPPDATA\Temp\npx-*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\npm-cache\_npx" -Recurse -Force -ErrorAction SilentlyContinue

# Clean npm cache
npm cache clean --force

# Verify nothing is lingering
Get-Command plasmic -All
