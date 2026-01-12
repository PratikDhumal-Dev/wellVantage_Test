// Production backend URL (Render)
const PRODUCTION_URL = 'https://wellvantage-test.onrender.com';

// For local development (uncomment to use local backend)
// const COMPUTER_IP = '192.168.29.200';
// const LOCAL_URL = `http://${COMPUTER_IP}:3000/api`;

const getBaseURL = () => {
  if (__DEV__) {
    // Use production backend by default
    // Uncomment below to use local backend instead:
    // return LOCAL_URL;
    return `${PRODUCTION_URL}/api`;
  }
  return `${PRODUCTION_URL}/api`;
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


