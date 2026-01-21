# Suraj's Portfolio

A modern, dynamic portfolio website built with React Router (frontend) and Django REST Framework (backend). Features include real-time project management through Django admin, PostgreSQL database support, and optional cloud media storage (Cloudinary/AWS S3).

---

## 🚀 Features

- **Dynamic Content Management**: Add/edit projects via Django admin
- **Modern Frontend**: React Router 7 with TypeScript and Tailwind CSS
- **RESTful API**: Django REST Framework backend
- **Database Options**: PostgreSQL (production) or SQLite (local dev)
- **Media Storage**: Local filesystem, Cloudinary, or AWS S3
- **Docker Support**: Multi-container setup with Docker Compose
- **Responsive Design**: Mobile-first design that works on all devices

---

## 📋 Tech Stack

**Frontend:**
- React Router 7
- TypeScript
- Tailwind CSS
- Vite

**Backend:**
- Django 4.2
- Django REST Framework
- PostgreSQL / SQLite
- Gunicorn (production)

**DevOps:**
- Docker & Docker Compose
- Nginx (optional)

---

## 🏃 Quick Start (Local Development)

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### 1. Clone & Setup

\`\`\`bash
cd ~/Desktop/protfolio
\`\`\`

### 2. Backend Setup

\`\`\`bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Run migrations
cd backend/backend
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start backend server
python manage.py runserver 127.0.0.1:8000
\`\`\`

### 3. Frontend Setup (in new terminal)

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### 4. Access

- **Frontend:** http://localhost:5173
- **Backend Admin:** http://localhost:8000/admin
- **API:** http://localhost:8000/api/projects/

---

## �� Docker Setup (Recommended)

### Prerequisites
- Docker & Docker Compose
- sudo access (or add user to docker group)

### 1. Configure Environment

Ensure \`backend/.env\` exists with:
\`\`\`env
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0,backend

POSTGRES_DB=portfolio
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=portfolio
POSTGRES_HOST=postgres

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
\`\`\`

### 2. Start Services

\`\`\`bash
sudo docker compose up --build
\`\`\`

Wait 30-60 seconds for all services to initialize.

### 3. Create Superuser (in new terminal)

\`\`\`bash
sudo docker compose exec backend python manage.py createsuperuser
\`\`\`

### 4. Access

- **Frontend:** http://localhost:3000
- **Backend Admin:** http://localhost:8000/admin
- **API:** http://localhost:8000/api/projects/

### 5. Stop Services

\`\`\`bash
sudo docker compose down
\`\`\`

To remove volumes (database data):
\`\`\`bash
sudo docker compose down -v
\`\`\`

---

## 📝 Adding Projects

1. Go to http://localhost:8000/admin/
2. Log in with superuser credentials
3. Click **Projects** → **Add Project**
4. Fill in:
   - **Title**: Project name
   - **Description**: Project overview
   - **Tags**: JSON array like \`["React", "Django", "TypeScript"]\`
   - **Image**: Upload file OR
   - **Image URL**: External image link
   - **Live URL**: Demo link (optional)
   - **Repo URL**: GitHub link (optional)
   - **Sort Order**: Display order (0 = first)
5. Click **Save**

Projects appear on the frontend automatically!

---

## 🎨 Customization

### Change Site Title

**Browser Tab:**
Edit \`frontend/app/routes/home.tsx\`:
\`\`\`tsx
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Your Name - Portfolio" },
    { name: "description", content: "Your description" },
  ];
}
\`\`\`

**Hero Section:**
Edit \`frontend/components/hero.tsx\`:
\`\`\`tsx
<h1>Your Name - Your Title</h1>
<p>Your tagline here</p>
\`\`\`

### Update About Section

Edit \`frontend/components/about.tsx\`

### Modify Contact Form

Edit \`frontend/components/contact.tsx\`

---

## 🗄️ Database Management

### Local SQLite
Database stored at: \`backend/backend/db.sqlite3\`

### Docker PostgreSQL
- Volume: \`pgdata\` (persists across restarts)
- Access: \`localhost:5432\`

**Reset Database:**
\`\`\`bash
# Local
rm backend/backend/db.sqlite3
python manage.py migrate

# Docker
sudo docker compose down -v
sudo docker compose up --build
\`\`\`

---

## ☁️ Media Storage (Optional)

### Cloudinary (Recommended)

1. Sign up at https://cloudinary.com
2. Add to \`backend/.env\`:
\`\`\`env
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
\`\`\`
3. Rebuild: \`docker compose up --build\`

### AWS S3

1. Create S3 bucket + IAM credentials
2. Add to \`backend/.env\`:
\`\`\`env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_STORAGE_BUCKET_NAME=your_bucket
AWS_S3_REGION_NAME=us-east-1
\`\`\`
3. Rebuild: \`docker compose up --build\`

---

## 🛠️ Development

### Backend Commands

\`\`\`bash
source venv/bin/activate
cd backend/backend

# Create migrations
python manage.py makemigrations

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic

# Run tests
python manage.py test
\`\`\`

### Frontend Commands

\`\`\`bash
cd frontend

# Install dependencies
npm install

# Dev server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
\`\`\`

---

## 📦 Project Structure

\`\`\`
protfolio/
├── backend/
│   ├── backend/
│   │   ├── backend/         # Django settings
│   │   │   ├── settings.py
│   │   │   ├── urls.py
│   │   │   └── wsgi.py
│   │   ├── portfolio/       # Portfolio app
│   │   │   ├── models.py    # Project model
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   ├── admin.py
│   │   │   └── urls.py
│   │   └── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── app/
│   │   ├── routes/          # React Router routes
│   │   │   └── home.tsx
│   │   ├── welcome/
│   │   │   └── welcome.tsx
│   │   └── root.tsx
│   ├── components/          # React components
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── project.tsx
│   │   ├── experience.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   ├── package.json
│   ├── Dockerfile
│   └── vite.config.ts
├── docker-compose.yml
├── QUICKSTART.md
├── PRODUCTION_SETUP.md
└── README.md
\`\`\`

---

## 🚀 Production Deployment

### Checklist

- [ ] Set \`DJANGO_DEBUG=False\`
- [ ] Generate strong \`DJANGO_SECRET_KEY\`
- [ ] Configure \`ALLOWED_HOSTS\` with your domain
- [ ] Update \`CORS_ALLOWED_ORIGINS\` with frontend domain
- [ ] Use PostgreSQL (not SQLite)
- [ ] Configure Cloudinary or S3 for media
- [ ] Set up HTTPS/SSL
- [ ] Run \`collectstatic\`
- [ ] Use gunicorn (already configured in Docker)

### Docker Production

Update \`backend/.env\`:
\`\`\`env
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=<generate-secure-key>
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
\`\`\`

Then:
\`\`\`bash
docker compose -f docker-compose.prod.yml up -d
\`\`\`

---

## 🐛 Troubleshooting

### Backend won't start

**Error:** \`ModuleNotFoundError: No module named 'dotenv'\`
\`\`\`bash
pip install -r backend/requirements.txt
\`\`\`

**Error:** \`could not translate host name "postgres"\`
- Using local dev? Backend defaults to SQLite (no issue)
- Using Docker? Check \`docker compose logs postgres\`

### Frontend connection refused

**Error:** \`ECONNREFUSED 127.0.0.1:8000\`
- Backend not running. Start it first: \`python manage.py runserver\`

### Port already in use

\`\`\`bash
# Kill process on port 8000
lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9
\`\`\`

### Docker permission denied

\`\`\`bash
# Add user to docker group (requires logout/login)
sudo usermod -aG docker $USER
newgrp docker

# Or use sudo
sudo docker compose up
\`\`\`

---

## 📄 License

MIT License - feel free to use this project for your own portfolio!

---

## 👤 Author

**Suraj**
- Email: sethsuraj520@gmail.com

---

## 🙏 Acknowledgments

- React Router team for the amazing framework
- Django community for excellent documentation
- Tailwind CSS for utility-first styling
