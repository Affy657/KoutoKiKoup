import axios, {
  type AxiosResponse,
  type AxiosRequestConfig,
  type AxiosError
} from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

export function performRequest<T, D>(options: AxiosRequestConfig<D>, callback: (response: AxiosResponse<T, D> | null, error: AxiosError<T, D> | null) => void): (reason: string) => void {
  const abortController = new AbortController();
  options.signal = abortController.signal;

  api(options)
      .then((response) => callback(response, null))
      .catch((error) => callback(null, error));

  return (reason: string) => abortController.abort(reason);
}

export const fetchKnives = async () => {
  const response = await api.get('/knives');
  return response.data;
};

export const fetchKnifeById = async (id: string | number) => {
  const response = await api.get(`/knives/${id}`);
  return response.data;
};

export const addKnife = async (knifeData: any, userId: string | number) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("Token d'authentification manquant.");
  }
  const dataToSubmit = { ...knifeData, userId };
  console.log(dataToSubmit);

  const response = await api.post('/knives', knifeData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const updateKnife = async (id: string | number, knifeData: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("Token d'authentification manquant.");
  }
  const response = await api.put(
      `/knives/${id}`,
      knifeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
  );
  return response.data;
};

export const deleteKnife = async (id: string | number) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("Token d'authentification manquant.");
  }
  const response = await api.delete(`/knives/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const filterKnives = async (params: Record<string, string>) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/knives/filter?${queryString}`);
  return response.data;
}

export const autocompleteKnives = async (term: string) => {
  const response = await api.get(`/knives/autocomplete?term=${encodeURIComponent(term)}`);
  return response.data;
}
