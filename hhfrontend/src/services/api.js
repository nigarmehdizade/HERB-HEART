import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URI || 'http://localhost:5000',
  withCredentials: true, // cookie ilə işləyəcəksə
})

export default API
