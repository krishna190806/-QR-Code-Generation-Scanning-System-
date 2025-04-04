import axios from 'axios';

const login = async (email, password) => {
  try {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.token);  // Store JWT in localStorage
  } catch (err) {
    console.error('Login error', err);
  }
};
