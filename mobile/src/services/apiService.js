import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // Bypass ngrok warning page
  },
  timeout: 10000, // 10 second timeout (increased for ngrok)
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.log('Request timeout - backend may not be running');
    } else if (error.message === 'Network Error') {
      console.log('Network error - check if backend is running and accessible');
    }
    return Promise.reject(error);
  }
);

// Availability API
export const createAvailability = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.availability.create, data);
  return response.data;
};

export const getAvailabilityByDate = async (date) => {
  const response = await apiClient.get(API_ENDPOINTS.availability.getByDate(date));
  return response.data;
};

export const getAllAvailability = async (trainerId) => {
  const params = trainerId ? { trainerId } : {};
  const response = await apiClient.get(API_ENDPOINTS.availability.getAll, {
    params,
  });
  return response.data;
};

export const deleteAvailability = async (id) => {
  await apiClient.delete(API_ENDPOINTS.availability.delete(id));
};

// Slots API
export const getSlotsByDate = async (date) => {
  const response = await apiClient.get(API_ENDPOINTS.slots.getByDate(date));
  return response.data;
};

export const deleteSlot = async (id) => {
  await apiClient.delete(API_ENDPOINTS.slots.delete(id));
};

// Workout Plans API
export const createWorkoutPlan = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.workoutPlans.create, data);
  return response.data;
};

export const getAllWorkoutPlans = async () => {
  const response = await apiClient.get(API_ENDPOINTS.workoutPlans.getAll);
  return response.data;
};

export const getWorkoutPlanById = async (id) => {
  const response = await apiClient.get(API_ENDPOINTS.workoutPlans.getById(id));
  return response.data;
};

export const updateWorkoutPlan = async (id, data) => {
  const response = await apiClient.put(API_ENDPOINTS.workoutPlans.update(id), data);
  return response.data;
};

export const deleteWorkoutPlan = async (id) => {
  await apiClient.delete(API_ENDPOINTS.workoutPlans.delete(id));
};


