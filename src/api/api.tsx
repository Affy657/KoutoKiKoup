import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const fetchKnives = async () => {
  const response = await api.get('/knives');
  return response.data;
};

export const fetchKnifeById = async (id: string | number) => {
  const response = await api.get(`/knives/${id}`);
  return response.data;
};
