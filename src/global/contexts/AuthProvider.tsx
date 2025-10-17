import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext, type AuthContextType } from './AuthContext';
import { tokenManager } from '../utils/tokenManager';
import { authService, type LoginRequestDTO } from '../../domains/user/features/authService';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!accessToken;

  const setReactiveAndLetAccessToken = (token: string | null) => {
    setAccessToken(token); // Atualiza o estado REATIVO do React
    tokenManager.setToken(token); // Atualiza a PONTE para o apiClient
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await authService.refreshToken();

        if (response.accessToken && response.accessToken) {
          setReactiveAndLetAccessToken(response.accessToken);
          console.log("Sessão restaurada com sucesso.");
        }
      } catch (error) {
        console.log("Nenhuma sessão ativa encontrada. ", error);

        setAccessToken(null); // Limpa o token local
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (data: LoginRequestDTO) => {
    const response = await authService.login(data);
    if (response.accessToken) {
      setReactiveAndLetAccessToken(response.accessToken);
    }
  };

  const logout = async () => {
    await authService.logout();
    setReactiveAndLetAccessToken(null);
  };

  const value: AuthContextType = {
    accessToken,
    isLoggedIn,
    isLoading,
    login,
    logout,
  };

  // Enquanto estiver verificando, mostramos um loader.
  if (isLoading) {
    return <div>Carregando aplicação...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}