// src/services/api.js
import axios from 'axios'

const API = axios.create({
  baseURL: 'https://krishi-mitra-nodebackend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Disease Detection API
export const detectDisease = (imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)
  
  return API.post('/disease/detect', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// Crop Recommendation API
export const getCropRecommendation = (soilData) => {
  return API.post('/crop/recommend', soilData)
}

// ✅ NEW: Weather Alerts API


export const getWeatherAlerts = (latitude, longitude) => {
  const token = localStorage.getItem("token"); // token from login
  return API.post(
    "/weather/alerts",
    { latitude, longitude },
    {
      headers: {
        Authorization: `Bearer ${token}` // ✅ send token
      }
    }
  );
};

// Crop APIs
export const cropAPI = {
  createCrop: (cropData) => API.post('/crop/create', cropData),
  getUserCrops: () => API.get('/crop/user'),
}

export default API