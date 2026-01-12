# WellVantage - Gym Management App

A React Native CLI application for gym trainers to manage workouts, set availability, and book client slots.

## Project Structure

```
wellVantage/
├── mobile/          # React Native CLI app
├── backend/         # NestJS backend API
└── Web App Test/    # Design references
```

## Prerequisites

- Node.js (v18 or higher)
- React Native CLI
- MongoDB (for backend)
- iOS: Xcode and CocoaPods
- Android: Android Studio and JDK

## Setup Instructions

### Mobile App (React Native)

1. Navigate to mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. For iOS:
```bash
cd ios && pod install && cd ..
```

4. Configure Google Sign-in:
   - Update `src/services/googleSignInService.ts` with your Google OAuth credentials
   - Add `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)

5. Update API base URL in `src/constants/api.ts`

6. Run the app:
```bash
# iOS
npm run ios

# Android
npm run android
```

### Backend (NestJS)

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB database:
   - Install MongoDB locally or use MongoDB Atlas (cloud)
   - Update MongoDB connection string in `src/app.module.ts` or use environment variables

4. Environment variables (create `.env` file):
```
MONGODB_URI=mongodb://localhost:27017/wellvantage
PORT=3000
NODE_ENV=development
```

   **For MongoDB Atlas:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellvantage?retryWrites=true&w=majority
   ```

5. Run the backend:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Features

- **Google Sign-in**: Secure authentication with Google
- **Workout Management**: Create and manage custom workout plans
- **Availability Management**: Set trainer availability with recurring sessions support
- **Slot Booking**: View and manage available time slots for clients

## API Endpoints

### Availability
- `POST /api/availability` - Create availability slot(s)
- `GET /api/availability/:date` - Get availability for a date
- `GET /api/availability` - Get all availability
- `DELETE /api/availability/:id` - Delete availability

### Slots
- `GET /api/slots/:date` - Get slots for a date
- `DELETE /api/slots/:id` - Delete a slot

## Deployment

### Backend Hosting

For free permanent hosting, see **[BACKEND_HOSTING_GUIDE.md](./BACKEND_HOSTING_GUIDE.md)** for detailed instructions.

**Quick Start (Render):**
1. Push backend code to GitHub
2. Sign up at [render.com](https://render.com)
3. Create new Web Service from GitHub repo
4. Set environment variables (MONGODB_URI, PORT)
5. Deploy!

**Recommended Setup:**
- **Backend**: Render (free tier) or Railway ($5/month credit)
- **Database**: MongoDB Atlas (free tier - 512MB)

### Mobile App

Update `mobile/src/constants/api.js` with your production backend URL after deployment.

## Notes

- The app uses React Native CLI (not Expo)
- Backend uses MongoDB database with Mongoose
- Google Sign-in requires proper OAuth configuration
- Update API base URL for production deployment
- See `BACKEND_HOSTING_GUIDE.md` for free hosting options

## License

MIT

