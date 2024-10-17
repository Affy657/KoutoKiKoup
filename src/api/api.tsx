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

export const fetchKnivesByUser = async (id: string | number) => {
  const response = await api.get(`/knives/filter`, {
    params: {
      userId: id, // Add the userId as a query parameter
    },
  });
  return response.data;
};


export const fetchMyProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await api.get(`/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
