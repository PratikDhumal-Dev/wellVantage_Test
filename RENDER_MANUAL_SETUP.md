# Render Manual Setup Instructions

## Issue
Render is not automatically detecting the `render.yaml` file or the root directory. You need to configure it manually in the Render dashboard.

## Step-by-Step Manual Configuration

### 1. Go to Your Render Service
- Navigate to your Render dashboard
- Click on your `wellvantage-backend` service (or create a new one if needed)

### 2. Configure Root Directory
1. Click on **Settings** tab
2. Scroll down to **Build & Deploy** section
3. Find **Root Directory** field
4. Enter: `backend`
5. This tells Render where to find your `package.json`

### 3. Configure Build Settings
In the same **Build & Deploy** section:

- **Build Command**: `npm install --include=dev && npm run build`
- **Start Command**: `npm run start:prod`

### 4. Set Environment Variables
1. Click on **Environment** tab
2. Add the following environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGODB_URI` | `mongodb+srv://pratikAdmin:7uZqpUVJQDzjRmcW@cluster0.vyrvwhb.mongodb.net/wellvantage?retryWrites=true&w=majority` |

### 5. Save and Deploy
1. Click **Save Changes**
2. Render will automatically trigger a new deployment
3. Monitor the **Logs** tab to see the build progress

## Expected Build Output

After configuration, you should see:
```
==> Cloning from https://github.com/PratikDhumal-Dev/wellVantage_Test
==> Checking out commit...
==> Using Node.js version...
==> Running build command 'npm install && npm run build'...
==> Installing dependencies...
==> Building...
==> Build succeeded!
==> Starting service...
```

## Troubleshooting

### If build still fails:
1. Check the **Logs** tab for specific error messages
2. Verify the Root Directory is set to `backend` (not `backend/` with trailing slash)
3. Ensure all environment variables are set correctly
4. Check that MongoDB Atlas allows connections from Render's IPs (add `0.0.0.0/0` in Network Access)

### Common Issues:
- **"Cannot find package.json"**: Root Directory not set correctly
- **"MongoDB connection failed"**: Check MONGODB_URI and Network Access settings
- **"Port already in use"**: PORT environment variable should be `10000`

## After Successful Deployment

1. Your backend will be available at: `https://your-service-name.onrender.com`
2. API endpoints will be at: `https://your-service-name.onrender.com/api`
3. Update `mobile/src/constants/api.js` with your Render URL
4. Test the API endpoints from your mobile app

