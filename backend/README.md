# WellVantage Backend

NestJS backend API for WellVantage gym management app using MongoDB.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

## Installation

```bash
npm install
```

## Database Setup

### Local MongoDB

1. Install MongoDB:
   - **macOS**: `brew install mongodb-community`
   - **Windows/Linux**: Follow [MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/)

2. Start MongoDB:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Or run manually
   mongod
   ```

3. Default connection: `mongodb://localhost:27017/wellvantage`

### MongoDB Atlas (Cloud)

1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env` file

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/wellvantage
PORT=3000
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellvantage?retryWrites=true&w=majority
```

## Running the App

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000/api`

## API Endpoints

### Availability
- `POST /api/availability` - Create availability slot(s)
- `GET /api/availability/:date` - Get availability for a date
- `GET /api/availability` - Get all availability
- `DELETE /api/availability/:id` - Delete availability

### Slots
- `GET /api/slots/:date` - Get slots for a date
- `DELETE /api/slots/:id` - Delete a slot

## Project Structure

```
backend/
├── src/
│   ├── modules/
│   │   ├── availability/    # Availability module
│   │   └── slots/            # Slots module
│   ├── common/
│   │   └── entities/         # Mongoose schemas
│   ├── app.module.ts
│   └── main.ts
└── package.json
```

## Database Models

### Availability
- `trainerId`: Trainer identifier
- `date`: Availability date
- `startTime`: Start time (string format)
- `endTime`: End time (string format)
- `sessionName`: Session name
- `isRecurring`: Whether it's recurring
- `recurringDates`: Array of recurring dates

### Slot
- `availabilityId`: Reference to availability
- `date`: Slot date
- `startTime`: Start time
- `endTime`: End time
- `clientId`: Client identifier (optional)
- `status`: 'open' or 'booked'

## License

MIT


