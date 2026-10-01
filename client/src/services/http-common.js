import axios from 'axios';

// Cross-origin requests don't carry cookies unless withCredentials is true,
// required once the server issues the httpOnly session cookie.
export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
