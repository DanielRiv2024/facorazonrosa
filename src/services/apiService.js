import axios from 'axios';


//const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const BASE_URL = 'https://backendproductioncorazonrosa.azurewebsites.net/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Crear instancia de Axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const ProductsAPI = {
  getAll: async () => {
    const res = await api.get(`/GetProducts${API_KEY ? `?code=${API_KEY}` : ''}`);
    return res.data;
  },

    getById: async (id) => {
    const url = `/GetProduct/${id}${API_KEY ? `?code=${API_KEY}` : ''}`;
    const res = await api.get(url);
    return res.data;
  },

   create: async (product) => {
    console.log(product)
    const url = `/CreateProduct${API_KEY ? `?code=${API_KEY}` : ''}`;
    const res = await api.post(url, product);
    return res.data;
  },

    updateById: async (id, updatedProduct) => {
    const url = `/UpdateProduct/${id}${API_KEY ? `?code=${API_KEY}` : ''}`;
    const res = await api.put(url, updatedProduct);
    return res.data;
  },

  deleteById: async (id) => {
    const url = `/DeleteProduct/${id}${API_KEY ? `?code=${API_KEY}` : ''}`;
    const res = await api.delete(url);
    return res.data;
  },
};

export const BillingAPI = {
  create: async (data) => {
    const res = await api.post(`/CreateBilling${API_KEY ? `?code=${API_KEY}` : ''}`, data);
    return res.data;
  },

  getAll: async () => {
    const res = await api.get(`/GetAllBillings${API_KEY ? `?code=${API_KEY}` : ''}`);
    return res.data;
  },

  getByDate: async (date) => {
    const res = await api.get(`/GetBillingByDate?date=${date}${API_KEY ? `&code=${API_KEY}` : ''}`);
    return res.data;
  },
};
