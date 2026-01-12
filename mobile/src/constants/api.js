// Temporary ngrok URL for testing (this will change when ngrok restarts)
// To get a new URL, run: ngrok http 3000
const NGROK_URL = 'https://d052f8c98d42.ngrok-free.app';

// For local development (uncomment to use local network)
// const COMPUTER_IP = '192.168.29.200';
// const LOCAL_URL = `http://${COMPUTER_IP}:3000/api`;

const getBaseURL = () => {
  if (__DEV__) {
    // Using ngrok for temporary public access
    // Note: ngrok free tier shows a warning page on first visit
    return `${NGROK_URL}/api`;
    
    // Uncomment below to use local network instead:
    // return LOCAL_URL;
  }
  return 'https://your-production-api.com/api';
};

export const API_BASE_URL = getBaseURL();

export const API_ENDPOINTS = {
  availability: {
    create: '/availability',
    getByDate: (date) => `/availability/${date}`,
    getAll: '/availability',
    delete: (id) => `/availability/${id}`,
  },
  slots: {
    getByDate: (date) => `/slots/${date}`,
    delete: (id) => `/slots/${id}`,
  },
  workoutPlans: {
    create: '/workout-plans',
    getAll: '/workout-plans',
    getById: (id) => `/workout-plans/${id}`,
    update: (id) => `/workout-plans/${id}`,
    delete: (id) => `/workout-plans/${id}`,
  },
};


