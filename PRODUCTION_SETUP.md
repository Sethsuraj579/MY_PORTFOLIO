# Postgres + Gunicorn + Media Hosting Setup

## Environment Variables

Create or update `backend/.env` with:

```env
# Django
DJANGO_SECRET_KEY=your-super-secret-key-change-in-production
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,backend

# Postgres
POSTGRES_DB=portfolio
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=your-postgres-password-change-in-production
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Choose ONE media storage option:

# Option 1: Cloudinary (recommended for managed uploads)
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Option 2: AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1
AWS_S3_CUSTOM_DOMAIN=d123.cloudfront.net
```

## Running the Stack

```bash
# From repo root:
docker compose up --build

# Migrations run automatically on container start
# Access Django admin at http://localhost:8000/admin/
# Frontend at http://localhost:3000

# Create superuser (one time):
docker compose exec backend python manage.py createsuperuser
```

## Adding Projects

1. Go to `http://localhost:8000/admin/`
2. Log in with superuser credentials
3. Add/edit projects with:
   - Title, description, tags (JSON array), live_url, repo_url
   - **image** (file upload) — goes to configured storage
   - **image_url** (external URL) — fallback if no file uploaded
4. Frontend automatically displays via `resolved_image_url` preference

## Storage Options

### Cloudinary (Recommended)
- Sign up at https://cloudinary.com (free tier: 25GB storage)
- Copy API credentials to `.env`
- Images stored in cloud, auto-optimized CDN

### AWS S3
- Create S3 bucket + CloudFront distribution
- Add IAM keys to `.env`
- Ideal for high-traffic sites

### Local Filesystem (Dev Only)
- Default; files stored in `backend/media/`
- Served at `http://backend:8000/media/...`

## What Changed

- **Backend Dockerfile**: Now runs migrations + gunicorn
- **docker-compose**: Added Postgres service + volume
- **settings.py**: Postgres config, storage backends (Cloudinary/S3), media settings
- **portfolio/models.py**: Added `image` field + migration
- **serializer**: New `resolved_image_url` field prioritizing uploaded file
- **frontend**: Renders real images with fallback to placeholder
- **urls.py**: Media serving in dev (DEBUG=True)

## Production Checklist

- [ ] Set `DJANGO_DEBUG=False`
- [ ] Generate strong `DJANGO_SECRET_KEY`
- [ ] Use Postgres (not SQLite)
- [ ] Configure Cloudinary or S3
- [ ] Set proper `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`
- [ ] Use environment-specific `.env` (not committed)
- [ ] Run `collectstatic` for admin CSS
