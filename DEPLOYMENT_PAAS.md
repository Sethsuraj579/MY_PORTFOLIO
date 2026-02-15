# Portfolio Deployment Guide - PaaS (Vercel + Render)

This guide will help you deploy your portfolio using **Vercel** (frontend) and **Render** (backend + database).

## Prerequisites

- GitHub account
- Vercel account (free): https://vercel.com
- Render account (free): https://render.com

---

## Step 1: Push Code to GitHub

```bash
cd /home/suraj/Desktop/protfolio

# Add all files
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## Step 2: Deploy Backend on Render

### 2.1 Create New Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `Sethsuraj579/MY_PORTFOLIO`
4. Configure:
   - **Name**: `portfolio-backend`
   - **Region**: Oregon (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`
   - **Plan**: Free

### 2.2 Add Environment Variables

Click **"Environment"** and add:

```
DJANGO_SECRET_KEY=<generate-random-50-char-string>
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=<your-backend-url>.onrender.com
CORS_ALLOWED_ORIGINS=https://<your-frontend-url>.vercel.app
CSRF_TRUSTED_ORIGINS=
```

### 2.3 Create PostgreSQL Database

1. In Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `portfolio-db`
   - **Database**: `portfolio`
   - **Plan**: Free
3. Click **"Create Database"**
4. Copy the **Internal Database URL**
5. Go back to your web service → **Environment** → Add:
   ```
   DATABASE_URL=<internal-database-url>
   ```

### 2.4 Deploy

- Click **"Create Web Service"**
- Wait for deployment (~5 minutes)
- Copy your backend URL: `https://portfolio-backend-xxxx.onrender.com`

### 2.5 Run Migrations

In Render dashboard → **Shell** tab, run:
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic --noinput
```

---

## Step 3: Deploy Frontend on Vercel

### 3.1 Import Project

1. Go to https://vercel.com/new
2. Import Git Repository → Select `MY_PORTFOLIO`
3. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build/client`

### 3.2 Add Environment Variable

Click **"Environment Variables"** and add:
```
VITE_API_URL=https://portfolio-backend-xxxx.onrender.com
```
(Use your Render backend URL from Step 2.4)

### 3.3 Deploy

- Click **"Deploy"**
- Wait for deployment (~3 minutes)
- Your frontend URL: `https://<your-project>.vercel.app`

---

## Step 4: Update Backend CORS

Go back to Render → Your backend service → **Environment**

Update these variables with your Vercel URL:
```
DJANGO_ALLOWED_HOSTS=portfolio-backend-xxxx.onrender.com
CORS_ALLOWED_ORIGINS=https://<your-project>.vercel.app
CSRF_TRUSTED_ORIGINS=https://<your-project>.vercel.app
```

Click **"Save Changes"** → Service will redeploy automatically

---

## Step 5: Test Your Deployment

1. Open your Vercel URL: `https://<your-project>.vercel.app`
2. Verify animations work
3. Go to admin: `https://portfolio-backend-xxxx.onrender.com/admin`
4. Add projects via Django admin
5. Refresh frontend to see projects

---

## Important Notes

### Free Tier Limitations

**Render Free Tier:**
- Backend spins down after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month free

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Always fast (no cold starts)

### Upgrade to Keep Backend Always On

If you want instant backend response:
- Upgrade Render to Starter plan ($7/month)
- Or use a VPS with Docker (Option 1 from earlier)

---

## Custom Domain (Optional)

### On Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### On Render:
1. Go to Service Settings → Custom Domain
2. Add your backend domain
3. Update DNS CNAME record

---

## Troubleshooting

**Frontend shows "Network Error":**
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend is running on Render

**Backend CORS errors:**
- Update `CORS_ALLOWED_ORIGINS` with exact frontend URL
- Include https:// protocol

**Database connection failed:**
- Verify `DATABASE_URL` is set in Render
- Check PostgreSQL database is running

---

Your portfolio is now live! 🚀
