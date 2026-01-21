# Quickstart Guide

## 1. Clone & Setup Environment

```bash
cd ~/Desktop/protfolio

# Create .env file
cat > backend/.env << 'EOF'
DJANGO_SECRET_KEY=dev-key-change-in-production
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,backend

POSTGRES_DB=portfolio
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=portfolio
POSTGRES_HOST=postgres

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
EOF
```

## 2. Start with Docker Compose

```bash
docker compose up --build
```

Wait for all services to be healthy. You'll see:
- Backend at `http://localhost:8000`
- Frontend at `http://localhost:3000`
- Postgres listening at `localhost:5432`

## 3. Create Admin User

```bash
docker compose exec backend python manage.py createsuperuser
# Follow prompts to set username, email, password
```

## 4. Add Projects

- Go to `http://localhost:8000/admin/`
- Log in with superuser credentials
- Click "Projects" and add project entries:
  - **Title**: e.g., "E-Commerce Platform"
  - **Description**: Project overview
  - **Tags** (JSON): e.g., `["React", "Next.js", "TypeScript"]`
  - **Image**: Upload image file OR
  - **Image URL**: Link to external image (e.g., GitHub/portfolio host)
  - **Live URL**: Link to live demo (optional)
  - **Repo URL**: Link to GitHub repo (optional)
  - **Sort Order**: Number to control display order

## 5. View on Frontend

Projects appear automatically at `http://localhost:3000#projects`

## Database Migrations

Migrations run automatically on container start. To manually run:

```bash
docker compose exec backend python manage.py migrate
```

## Switching Media Storage (Optional)

### To Use Cloudinary:
1. Sign up at https://cloudinary.com
2. Copy credentials to `backend/.env`:
   ```
   CLOUDINARY_URL=cloudinary://key:secret@cloud
   CLOUDINARY_CLOUD_NAME=your_cloud
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```
3. Rebuild: `docker compose up --build`

### To Use AWS S3:
1. Create S3 bucket + IAM credentials
2. Add to `backend/.env`:
   ```
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   AWS_STORAGE_BUCKET_NAME=your_bucket
   AWS_S3_REGION_NAME=us-east-1
   ```
3. Rebuild: `docker compose up --build`

## Troubleshooting

**"Connection refused" to Postgres?**
- Wait 10s for Postgres to start after `docker compose up`
- Check logs: `docker compose logs postgres`

**Admin CSS not loading?**
- Run: `docker compose exec backend python manage.py collectstatic --noinput`

**Images not showing?**
- Ensure `image_url` or uploaded file has valid URL
- Check browser Network tab for image 404s
- For Cloudinary/S3, verify credentials in logs: `docker compose logs backend`

**Need to reset database?**
- `docker compose down -v` (removes volumes)
- `docker compose up --build` (fresh start)
