# Nexus — Social Media Platform
### CodeAlpha Internship — Task 2

A full-stack social media web app built with Node.js, Express, MongoDB, and Vanilla JavaScript.

---

## 📁 Project Structure

```
CodeAlpha_SocialMedia/
├── backend/
│   ├── config/db.js           # MongoDB connection
│   ├── controllers/           # Business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT protection
│   │   └── upload.js          # Multer image uploads
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── posts.js
│   │   └── comments.js
│   ├── uploads/               # Uploaded images (auto-created)
│   ├── server.js              # Entry point
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── css/style.css          # Global styles
    ├── js/api.js              # API helper + utilities
    ├── pages/
    │   ├── login.html         # Login & Register
    │   ├── profile.html       # User profile
    │   └── explore.html       # Explore posts
    └── index.html             # Main feed
```

---

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))
- A code editor (VS Code recommended)

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/codealpha_social
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

Start the backend:
```bash
npm run dev     # Development with nodemon
# or
npm start       # Production
```

The API will run at: `http://localhost:5000`

### 3. Frontend Setup

The frontend is pure HTML/CSS/JS — no build step needed!

Simply open the `frontend/` folder with a local server. Recommended options:

**Option A — VS Code Live Server:**
1. Install the "Live Server" extension in VS Code
2. Right-click `frontend/index.html` → "Open with Live Server"

**Option B — Node http-server:**
```bash
npx http-server frontend -p 3000
```
Then open `http://localhost:3000`

**Option C — Python:**
```bash
cd frontend
python -m http.server 3000
```

### 4. Using MongoDB Atlas (Cloud)

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Get your connection string
4. Set it in `.env`:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/codealpha_social
```

---

## ✨ Features

| Feature | Status |
|---------|--------|
| User Registration & Login (JWT) | ✅ |
| User Profiles with avatars | ✅ |
| Create / Delete Posts | ✅ |
| Image uploads in posts | ✅ |
| Like / Unlike posts | ✅ |
| Comments on posts | ✅ |
| Follow / Unfollow users | ✅ |
| Personalized feed | ✅ |
| Explore all posts | ✅ |
| Search users | ✅ |
| User suggestions | ✅ |
| Edit profile | ✅ |
| Responsive design | ✅ |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/:username` | Get user profile |
| PUT | `/api/users/profile` | Update profile |
| POST | `/api/users/:id/follow` | Follow/unfollow |
| GET | `/api/users/search?q=` | Search users |
| GET | `/api/users/suggestions` | Get suggestions |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts` | Create post |
| GET | `/api/posts/feed` | Get feed |
| GET | `/api/posts/explore` | All posts |
| GET | `/api/posts/:id` | Single post |
| DELETE | `/api/posts/:id` | Delete post |
| PUT | `/api/posts/:id/like` | Like/unlike |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts/:id/comments` | Add comment |
| GET | `/api/posts/:id/comments` | Get comments |
| DELETE | `/api/comments/:id` | Delete comment |

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + bcryptjs
- **File Uploads:** Multer
- **Frontend:** HTML5, CSS3, Vanilla JavaScript

---

## 📦 GitHub Upload

Name your repository: `CodeAlpha_SocialMedia`

```bash
git init
git add .
git commit -m "CodeAlpha Task 2 - Social Media Platform"
git remote add origin https://github.com/yourusername/CodeAlpha_SocialMedia.git
git push -u origin main
```

---

Built with ❤️ for CodeAlpha Internship
