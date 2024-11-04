import {
  createContext,
  useEffect,
  useState
} from 'react';
import { BaseUser } from '../type';

export interface BaseUserContext {
  current: BaseUser | null;
  token: string | null;
  setCurrent: (user: BaseUser) => void;
  setToken: (token: string) => void;
}

const BASE_USER: BaseUserContext = {
  current: null,
  token: null,
  setCurrent: () => {},
  setToken: () => {}
}

export const UserContext = createContext(BASE_USER);

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [current, setCurrent] = useState<BaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleSetCurrent = (user: BaseUser) => {
    localStorage.setItem('user', JSON.stringify(user));
    setCurrent(user);
  }

  const handleSetToken = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setToken(token);
      setCurrent(JSON.parse(user));
    }
  }, []);

  const value = {
    current,
    token,
    setCurrent: handleSetCurrent,
    setToken: handleSetToken
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}