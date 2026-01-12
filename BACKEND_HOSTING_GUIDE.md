# Free Backend Hosting Guide

This guide will help you deploy your NestJS backend to a free hosting service. We'll use **Render** as it's one of the most straightforward options with a good free tier.

## Option 1: Render (Recommended)

### Features:
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificate
- ✅ Persistent URLs (no expiration)
- ✅ Environment variable management
- ✅ MongoDB Atlas integration

### Limitations:
- Free tier spins down after 15 minutes of inactivity (takes ~30 seconds to wake up)
- 512MB RAM
- 0.1 CPU share

### Step 1: Prepare Your Backend

1. **Create a `render.yaml` file** in your backend root:

```yaml
services:
  - type: web
    name: wellvantage-backend
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm run start:prod
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: MONGODB_URI
        sync: false  # Set this in Render dashboard
```

2. **Update `package.json` scripts** (if not already present):

```json
{
  "scripts": {
    "start:prod": "node dist/main.js"
  }
}
```

3. **Create `.env.example`** file:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellvantage?retryWrites=true&w=majority
```

### Step 2: Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (Free M0 tier)
4. Create a database user:
   - Database Access → Add New Database User
   - Username/Password
5. Whitelist IP addresses:
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allows all IPs) or Render's IPs
6. Get connection string:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password

### Step 3: Deploy to Render

1. **Push your code to GitHub** (if not already):
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   # Create a repo on GitHub and push
   ```

2. **Sign up for Render**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder (or root if backend is in root)
   - Configure:
     - **Name**: `wellvantage-backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm run start:prod`
     - **Plan**: `Free`

4. **Set Environment Variables**:
   - Go to Environment tab
   - Add:
     - `NODE_ENV` = `production`
     - `PORT` = `10000` (Render uses port from env var)
     - `MONGODB_URI` = Your MongoDB Atlas connection string

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes first time)
   - Your backend will be available at: `https://wellvantage-backend.onrender.com`

### Step 4: Update Mobile App

Update `mobile/src/constants/api.js`:

```javascript
const getBaseURL = () => {
  if (__DEV__) {
    // Production backend URL
    return 'https://wellvantage-backend.onrender.com/api';
    
    // For local development, uncomment below:
    // const COMPUTER_IP = '192.168.29.200';
    // return `http://${COMPUTER_IP}:3000/api`;
  }
  return 'https://wellvantage-backend.onrender.com/api';
};
```

---

## Option 2: Railway (Alternative)

### Features:
- ✅ $5 free credit monthly
- ✅ No spin-down (always on)
- ✅ Easy MongoDB integration
- ✅ Simple deployment

### Steps:

1. **Sign up**: [railway.app](https://railway.app)
2. **New Project** → Deploy from GitHub
3. **Add MongoDB**: Click "+ New" → Database → MongoDB
4. **Set Environment Variables**:
   - `MONGODB_URI` (from Railway's MongoDB service)
   - `PORT` (Railway sets this automatically)
5. **Deploy**: Railway auto-detects Node.js and deploys

---

## Option 3: Fly.io (Alternative)

### Features:
- ✅ Free tier with generous limits
- ✅ Global edge network
- ✅ No spin-down

### Steps:

1. **Install Fly CLI**: `curl -L https://fly.io/install.sh | sh`
2. **Login**: `fly auth login`
3. **Initialize**: `cd backend && fly launch`
4. **Deploy**: `fly deploy`

---

## Recommended Setup: Render + MongoDB Atlas

**Why Render?**
- Easiest to set up
- Free SSL
- GitHub integration
- Good documentation

**Why MongoDB Atlas?**
- Free tier (512MB storage)
- Managed service
- No server maintenance
- Works great with Render

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set
- [ ] Mobile app updated with new URL
- [ ] Test API endpoints from mobile app
- [ ] Monitor Render dashboard for any issues

---

## Troubleshooting

### Backend won't start:
- Check logs in Render dashboard
- Verify `MONGODB_URI` is correct
- Ensure `PORT` environment variable is set

### Connection timeout:
- Free tier spins down after inactivity
- First request after spin-down takes ~30 seconds
- Consider Railway for always-on (uses free credit)

### MongoDB connection errors:
- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure database user has correct permissions

---

## Cost Comparison

| Service | Free Tier | Always On | Best For |
|---------|-----------|-----------|----------|
| Render | ✅ Yes | ❌ No (spins down) | Development, Testing |
| Railway | ✅ $5/month credit | ✅ Yes | Production |
| Fly.io | ✅ Yes | ✅ Yes | Production |

For a production app, consider Railway or Fly.io for always-on availability.

