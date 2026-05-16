# Railway Deployment Guide for Mei Yu Portfolio

This guide will walk you through deploying your artist portfolio to Railway. Follow each step carefully!

---

## Step 1: Prepare Your Code for GitHub

Your code is ready to upload. Here's how:

### Option A: Using GitHub Web Interface (Easiest)

1. Go to https://github.com and sign in with your account (**meiyu88-git**)
2. Click the **+** icon (top right) → **New repository**
3. Fill in:
   - **Repository name:** `mei-yu-portfolio`
   - **Description:** `Mei Yu - What Light Remains - Artist Portfolio`
   - **Visibility:** Public
4. Click **Create repository**
5. On the next page, click **Add file** → **Upload files**
6. Download all your project files from Manus and drag them into GitHub
7. Click **Commit changes**

### Option B: Using Git Command Line

If you're comfortable with terminal:

```bash
# Navigate to your project
cd /home/ubuntu/mei-yu-portfolio

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Mei Yu artist portfolio"

# Add remote (replace with your GitHub username)
git remote add origin https://github.com/meiyu88-git/mei-yu-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Railway

1. Go to https://railway.app
2. Click **Login** → **GitHub** (sign in with your GitHub account)
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your `mei-yu-portfolio` repository
5. Railway will auto-detect it's a Node.js project
6. Click **Deploy**

Railway will start building and deploying your site. This takes 2-5 minutes.

---

## Step 3: Configure Environment Variables

Railway needs your API credentials to work properly:

1. In Railway dashboard, go to your project
2. Click the **Variables** tab
3. Add these environment variables:

```
BUILT_IN_FORGE_API_URL=<your-manus-api-url>
BUILT_IN_FORGE_API_KEY=<your-manus-api-key>
NODE_ENV=production
PORT=3000
```

**Where to find these values:**
- Go to your Manus project settings
- Look for "API Keys" or "Environment Variables"
- Copy the `BUILT_IN_FORGE_API_URL` and `BUILT_IN_FORGE_API_KEY` values

---

## Step 4: Connect Your Custom Domain

You've already purchased **meiyuportf.co**. Now connect it:

1. In Railway dashboard, go to **Settings**
2. Click **Domains**
3. Add your domain:
   - Click **Add Domain**
   - Enter `meiyuportf.co`
   - Railway will give you DNS records to update

4. Go to your domain registrar (where you bought meiyuportf.co)
5. Update DNS records with the values Railway provides
6. Wait 24-48 hours for DNS to propagate

---

## Step 5: Test Your Site

1. Once deployment is complete, Railway shows you a URL
2. Click **View Deployment** to test
3. Test the contact form
4. Verify everything looks good

---

## Step 6: Fix Email Delivery

The contact form currently tries to send emails through Manus API. For reliable email delivery on Railway, use a free service:

### Option A: Formspree (Easiest)

1. Go to https://formspree.io
2. Sign up (free tier available)
3. Create a new form with your email (mei.yu8899@gmail.com)
4. Update your contact form to use Formspree's endpoint

### Option B: EmailJS

1. Go to https://www.emailjs.com
2. Sign up (free tier available)
3. Follow their setup guide
4. Update your contact form code to use EmailJS

---

## Updating Your Site

After deployment, to make changes:

1. Edit your code locally or on GitHub
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: [describe changes]"
   git push
   ```
3. Railway automatically redeploys (1-2 minutes)

---

## Troubleshooting

**Site not loading?**
- Check Railway deployment status in dashboard
- View logs for error messages
- Restart deployment if needed

**Contact form not working?**
- Check environment variables are set correctly
- Verify API keys are valid
- Check Railway logs for errors

**Domain not working?**
- DNS changes take 24-48 hours
- Check DNS records are correct in your registrar
- Verify domain is connected in Railway settings

**Need help?**
- Railway docs: https://docs.railway.app
- Manus support: https://help.manus.im
- Contact support through Railway dashboard

---

## Your Site is Live! 🎨

Congratulations! Your artist portfolio is now live at **meiyuportf.co**

Share it with:
- Galleries and collectors
- Social media
- Your Instagram bio
- Art communities

Good luck with your art career! ✨
