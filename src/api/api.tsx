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

export const addKnife = async (knifeData: any) => {
  const response = await api.post('/knives', knifeData);
  return response.data;
};

export const updateKnife = async (id: string | number, knifeData: any) => {
  const response = await api.put(`/knives/${id}`, knifeData);
  return response.data;
};

export const deleteKnife = async (id: string | number) => {
  const response = await api.delete(`/knives/${id}`);
  return response.data;
};