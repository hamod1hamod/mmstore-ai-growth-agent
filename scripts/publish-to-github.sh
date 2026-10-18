#!/bin/bash
set -e

REPO_NAME="mmstore-ai-growth-agent"
DEFAULT_USER="hamod1hamod"
export PATH=/home/hamo/.local/bin:$PATH

echo "=========================================================="
echo "MMStore AI Growth Agent — Publish to GitHub (@$DEFAULT_USER)"
echo "=========================================================="

# Check if a Personal Access Token was supplied as argument or env var
TOKEN="${1:-$GITHUB_TOKEN}"

if [ -n "$TOKEN" ]; then
  echo "🔑 Using provided GitHub Personal Access Token..."
  # Test token and get username
  GH_USER=$(curl -s -H "Authorization: token $TOKEN" https://api.github.com/user | grep -o '"login": *"[^"]*"' | head -n1 | cut -d'"' -f4)
  if [ -z "$GH_USER" ]; then
    echo "❌ Provided token is invalid or expired."
    exit 1
  fi
  echo "✅ Authenticated as @$GH_USER"

  # Create private repository if it doesn't exist
  echo "📦 Ensuring private repository '$REPO_NAME' exists under @$GH_USER..."
  curl -s -X POST -H "Authorization: token $TOKEN" \
    -d "{\"name\":\"$REPO_NAME\",\"private\":true,\"description\":\"MMStore AI Social Media Growth Agent (Autonomous E-Commerce Marketing)\"}" \
    https://api.github.com/user/repos >/dev/null 2>&1 || true

  git remote remove origin 2>/dev/null || true
  git remote add origin "https://$TOKEN@github.com/$GH_USER/$REPO_NAME.git"
  git branch -M main
  echo "🚀 Pushing main branch to GitHub..."
  git push -u origin main

  # Reset origin URL to clean HTTPS (without embedding token)
  git remote set-url origin "https://github.com/$GH_USER/$REPO_NAME.git"
  echo "🎉 Repository published successfully!"
  echo "🔗 URL: https://github.com/$GH_USER/$REPO_NAME"
  exit 0
fi

# Fallback to GitHub CLI (gh)
if gh auth status >/dev/null 2>&1; then
  CURRENT_USER=$(gh api user -q .login 2>/dev/null || echo "$DEFAULT_USER")
  echo "✅ GitHub CLI authenticated as @$CURRENT_USER."
  echo "📦 Creating/verifying private repository '$REPO_NAME'..."

  if ! gh repo view "$REPO_NAME" >/dev/null 2>&1; then
    gh repo create "$REPO_NAME" --private --source=. --remote=origin --push
    echo "🎉 Private repository successfully created and published!"
  else
    git remote set-url origin "https://github.com/$CURRENT_USER/$REPO_NAME.git" 2>/dev/null || git remote add origin "https://github.com/$CURRENT_USER/$REPO_NAME.git"
    git push -u origin main
    echo "🎉 Code successfully pushed to private repository!"
  fi
  echo "🔗 Repository URL: https://github.com/$CURRENT_USER/$REPO_NAME"
  exit 0
fi

# Guidance if not authenticated
echo ""
echo "⚠️ Neither GitHub CLI nor a Personal Access Token was found."
echo ""
echo "👉 Quick Option 1: Run with your GitHub Personal Access Token:"
echo "    ./scripts/publish-to-github.sh ghp_yourPersonalAccessTokenHere"
echo ""
echo "👉 Quick Option 2: Authenticate using GitHub CLI for @$DEFAULT_USER:"
echo "    gh auth login"
echo "    ./scripts/publish-to-github.sh"
echo ""
