# Railway Deployment Guide

This guide will help you deploy your Mei Yu artist portfolio to Railway.

## Prerequisites

1. **GitHub Account** (new one with myu668866@gmail.com)
2. **Railway Account** (free signup at https://railway.app)
3. Your code repository on GitHub

## Step 1: Create a New GitHub Account

1. Go to https://github.com/signup
2. Sign up with **myu668866@gmail.com**
3. Create a username (e.g., `mei-yu-art`)
4. Verify your email

## Step 2: Create a GitHub Repository

1. After signing in to GitHub, click the **+** icon (top right) → **New repository**
2. Repository name: `mei-yu-portfolio`
3. Description: `Mei Yu - What Light Remains - Artist Portfolio`
4. Choose **Public** (so Railway can access it)
5. Click **Create repository**

## Step 3: Push Your Code to GitHub

Your code is already ready. Here's how to upload it:

### Option A: Using Git (Command Line)

```bash
# Navigate to your project folder
cd /home/ubuntu/mei-yu-portfolio

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Mei Yu artist portfolio"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/mei-yu-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Web Interface

1. Go to your new repository on GitHub
2. Click **Add file** → **Upload files**
3. Drag and drop all files from your project folder
4. Click **Commit changes**

## Step 4: Deploy to Railway

1. Go to https://railway.app
2. Click **Login** → **GitHub** (sign in with your new account)
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your `mei-yu-portfolio` repository
5. Railway will auto-detect it's a Node.js project
6. Click **Deploy**

## Step 5: Configure Environment Variables

Railway needs to know about your email and API keys:

1. In Railway dashboard, go to your project
2. Click **Variables** tab
3. Add these environment variables:

```
BUILT_IN_FORGE_API_URL=<your-manus-api-url>
BUILT_IN_FORGE_API_KEY=<your-manus-api-key>
NODE_ENV=production
```

(These values are in your Manus project settings)

## Step 6: Set Custom Domain (Optional)

1. In Railway dashboard, go to **Settings**
2. Click **Domains**
3. Add your custom domain or use Railway's auto-generated domain

## Step 7: Test Your Site

1. Click the **View Deployment** button in Railway
2. Test the contact form
3. Verify emails arrive at myu668866@gmail.com

## Updating Your Site

After deployment, to make updates:

1. Edit your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: [describe changes]"
   git push
   ```
3. Railway automatically redeploys (takes 1-2 minutes)

## Troubleshooting

**Contact form not sending emails?**
- Check Railway logs: Click **Logs** tab in your project
- Verify environment variables are set correctly
- Make sure BUILT_IN_FORGE_API_KEY is valid

**Site not loading?**
- Check Railway deployment status
- View logs for error messages
- Restart the deployment if needed

**Need help?**
- Railway docs: https://docs.railway.app
- Contact support through Railway dashboard

---

**Your site is now live!** 🎨✨

Share your portfolio link with galleries, collectors, and anyone interested in your work.
