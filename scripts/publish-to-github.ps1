# MMStore AI Growth Agent — Publish to GitHub (Private Repo) for Windows PowerShell
$ErrorActionPreference = "Stop"
$RepoName = "mmstore-ai-growth-agent"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "MMStore AI Growth Agent — Publish to GitHub (Private Repo)" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Check if gh is installed and authenticated
try {
    $authStatus = gh auth status 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Not authenticated"
    }
} catch {
    Write-Host ""
    Write-Host "⚠️ GitHub CLI is not yet authenticated." -ForegroundColor Yellow
    Write-Host "Please authenticate now by running:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "    gh auth login" -ForegroundColor Green
    Write-Host ""
    Write-Host "Follow the interactive prompts (select GitHub.com -> HTTPS -> Web Browser/Token)."
    Write-Host "Then rerun this script: .\scripts\publish-to-github.ps1"
    exit 1
}

Write-Host "✅ GitHub CLI authenticated successfully." -ForegroundColor Green
Write-Host "📦 Creating private repository '$RepoName' on GitHub..." -ForegroundColor Cyan

try {
    gh repo create $RepoName --private --source=. --remote=origin --push
    Write-Host "🎉 Private repository successfully created and published to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "ℹ️ Repository already exists or remote configured. Pushing main branch..." -ForegroundColor Yellow
    git push -u origin main
    Write-Host "🎉 Code successfully pushed to private repository!" -ForegroundColor Green
}

$user = gh api user -q .login
Write-Host ""
Write-Host "🔗 Private Repository URL: https://github.com/$user/$RepoName" -ForegroundColor Cyan
