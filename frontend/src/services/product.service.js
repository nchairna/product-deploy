import axios from 'axios';

const API_URL = 'http://localhost:4004/api';

// Add token to requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ProductService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addProduct: async (productData) => {
    try {
      const response = await axios.post(`${API_URL}/products`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await axios.put(`${API_URL}/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getImages: async () => {
    try {
      const response = await axios.get(`${API_URL}/images`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default ProductService;
