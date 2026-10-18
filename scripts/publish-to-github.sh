#!/bin/bash
set -e

REPO_NAME="mmstore-ai-growth-agent"
export PATH=/home/hamo/.local/bin:$PATH

echo "=========================================================="
echo "MMStore AI Growth Agent — Publish to GitHub (Private Repo)"
echo "=========================================================="

# Check if gh CLI is authenticated
if ! gh auth status >/dev/null 2>&1; then
  echo ""
  echo "⚠️ GitHub CLI is not yet authenticated."
  echo "Please authenticate now by running:"
  echo ""
  echo "    gh auth login"
  echo ""
  echo "Follow the prompts (GitHub.com -> HTTPS -> Login with a web browser or Token)."
  echo "Once authenticated, re-run this script: bash scripts/publish-to-github.sh"
  exit 1
fi

echo "✅ GitHub CLI authenticated successfully."
echo "📦 Creating private repository '$REPO_NAME' on GitHub..."

# Create private repository and push
if ! gh repo view "$REPO_NAME" >/dev/null 2>&1; then
  gh repo create "$REPO_NAME" --private --source=. --remote=origin --push
  echo "🎉 Private repository successfully created and published!"
else
  echo "ℹ️ Repository '$REPO_NAME' already exists on GitHub. Pushing main branch..."
  git remote set-url origin "https://github.com/$(gh api user -q .login)/$REPO_NAME.git" 2>/dev/null || git remote add origin "https://github.com/$(gh api user -q .login)/$REPO_NAME.git"
  git push -u origin main
  echo "🎉 Code successfully pushed to private repository!"
fi

echo ""
echo "🔗 Repository URL: https://github.com/$(gh api user -q .login)/$REPO_NAME"
