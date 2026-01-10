# GitHub Pages Deployment Guide

Your site is ready to deploy! Follow these steps to get it live.

## ✅ Pre-deployment Checklist (Already Done)

- [x] Git repository initialized
- [x] Initial commit created
- [x] .gitignore file added
- [x] GitHub screenshots (2025) added
- [x] All files ready to push

## Step 1: Create GitHub Repository

1. Go to **https://github.com/new**
2. Fill in the repository details:
   - **Repository name**: `personal-site` (or any name you prefer - this will be in your URL)
   - **Description**: "Personal website built with Jekyll"
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click **"Create repository"**

## Step 2: Get Your GitHub Personal Access Token

You'll need a Personal Access Token (PAT) to push code. Here's how to get it:

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: "Personal Site Deployment"
4. Set expiration: "No expiration" (or your preference)
5. Select scopes (check these boxes):
   - [x] **repo** (all repo permissions)
6. Scroll down and click **"Generate token"**
7. **IMPORTANT**: Copy the token NOW (starts with `ghp_...`) - you can't see it again!
8. Save it somewhere safe temporarily

## Step 3: Push Your Code to GitHub

Run these commands in your terminal (I'll help you):

```bash
# Set your GitHub username (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/personal-site.git

# Verify remote was added
git remote -v

# Push to GitHub (you'll be prompted for credentials)
git push -u origin master
```

**When prompted for credentials:**
- Username: `YOUR_GITHUB_USERNAME`
- Password: Paste your **Personal Access Token** (not your GitHub password!)

## Step 4: Configure GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/personal-site`
2. Click **"Settings"** (tab at the top)
3. In the left sidebar, click **"Pages"**
4. Under **"Source"**:
   - Branch: Select **"master"**
   - Folder: Select **"/ (root)"**
5. Click **"Save"**

GitHub will start building your site. This takes 1-2 minutes.

## Step 5: Update _config.yml with Your URL

Once GitHub Pages is enabled, you'll get a URL like:
`https://YOUR_USERNAME.github.io/personal-site/`

Update your `_config.yml`:

```yaml
url: "https://YOUR_USERNAME.github.io"
baseurl: "/personal-site"
```

Then commit and push:

```bash
git add _config.yml
git commit -m "Update site URL for GitHub Pages"
git push
```

## Step 6: Wait and Visit Your Site!

1. Wait 1-2 minutes for GitHub to build your site
2. Visit: `https://YOUR_USERNAME.github.io/personal-site/`
3. Your site should be live! 🎉

## Troubleshooting

### "Repository not found" when pushing
- Make sure you created the repository on GitHub first
- Check the remote URL: `git remote -v`
- Make sure your username is correct

### "Authentication failed"
- You must use your **Personal Access Token** as the password, not your GitHub password
- Make sure you selected the "repo" scope when creating the token

### Site shows 404 or broken links
- Make sure you updated `_config.yml` with your baseurl
- Wait a few minutes for GitHub Pages to rebuild
- Check GitHub Actions tab for build errors

### Images not loading
- Check that image files were committed: `git log --stat`
- Verify paths use `{{ '/assets/...' | relative_url }}`

## Future Updates

To update your site:

```bash
# Make changes to your files
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically rebuild (takes 1-2 minutes).

## Custom Domain (Optional)

Want to use your own domain instead of github.io?

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In GitHub repository Settings → Pages → Custom domain
3. Enter your domain (e.g., `aaronmulvihill.com`)
4. Follow GitHub's DNS configuration instructions

---

## Quick Reference

**Repository URL**: https://github.com/YOUR_USERNAME/personal-site
**Live Site URL**: https://YOUR_USERNAME.github.io/personal-site/
**Settings**: https://github.com/YOUR_USERNAME/personal-site/settings/pages

**Token management**: https://github.com/settings/tokens

---

**Status**: Ready to deploy! Follow steps above.
