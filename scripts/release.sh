#!/usr/bin/env bash
set -euo pipefail

# Release script
# Usage:
#   ./scripts/release.sh patch   # 1.0.0 -> 1.0.1
#   ./scripts/release.sh minor   # 1.0.0 -> 1.1.0
#   ./scripts/release.sh major   # 1.0.0 -> 2.0.0
#   ./scripts/release.sh 1.2.3   # explicit version

RELEASE_BRANCH="main"
DEVELOP_BRANCH="develop"
BUMP="${1:-}"

if [[ -z "$BUMP" ]]; then
  echo "Usage: ./scripts/release.sh [patch|minor|major|x.y.z]"
  exit 1
fi

# Ensure this is a Git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Error: not inside a Git repository."
  exit 1
fi

# Ensure package.json exists
if [[ ! -f "package.json" ]]; then
  echo "❌ Error: package.json not found in the current directory."
  exit 1
fi

# Ensure the working tree is clean
if [[ -n "$(git status --porcelain)" ]]; then
  echo "❌ Error: working tree is not clean."
  echo "Commit, stash, or discard your changes before releasing."
  git status --short
  exit 1
fi

# Fetch latest branches
echo "🔄 Fetching latest branches..."
git fetch origin "$RELEASE_BRANCH" "$DEVELOP_BRANCH"

# Switch to and update main
echo "🔄 Switching to $RELEASE_BRANCH..."
git checkout "$RELEASE_BRANCH"
git pull origin "$RELEASE_BRANCH"

# Safety check: ensure develop has no unreleased commits
echo "🔍 Checking that $DEVELOP_BRANCH has been merged into $RELEASE_BRANCH..."

UNMERGED_COMMITS="$(git log --oneline "origin/$DEVELOP_BRANCH" "^$RELEASE_BRANCH" || true)"

if [[ -n "$UNMERGED_COMMITS" ]]; then
  echo "❌ Error: $DEVELOP_BRANCH contains commits that are not in $RELEASE_BRANCH."
  echo
  echo "$UNMERGED_COMMITS"
  echo
  echo "Merge $DEVELOP_BRANCH into $RELEASE_BRANCH before creating a release."
  exit 1
fi

# Read the current version
CURRENT_VERSION="$(node -p "require('./package.json').version")"
echo "📦 Current version: $CURRENT_VERSION"

# Determine the new version
if [[ "$BUMP" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  NEW_VERSION="$BUMP"
else
  NEW_VERSION="$(npm version "$BUMP" --no-git-tag-version)"
  NEW_VERSION="${NEW_VERSION#v}"
fi

TAG="v$NEW_VERSION"

# Prevent duplicate release tags
if git rev-parse -q --verify "refs/tags/$TAG" >/dev/null 2>&1; then
  echo "❌ Error: tag $TAG already exists."
  exit 1
fi

echo "🚀 Releasing $TAG"

# Update lockfile without installing node_modules
npm install --package-lock-only

# Commit the version bump
git add package.json package-lock.json

if git diff --cached --quiet; then
  echo "⚠️ No package.json or package-lock.json changes to commit."
else
  git commit -m "chore(release): bump version to $NEW_VERSION"
fi

# Create and push the release tag
git tag -a "$TAG" -m "Release $TAG"

echo "⬆️ Pushing $RELEASE_BRANCH and $TAG..."
git push origin "$RELEASE_BRANCH"
git push origin "$TAG"

echo
echo "✅ Release $TAG created from $RELEASE_BRANCH."
echo "GitHub Actions should now start the deployment workflow."