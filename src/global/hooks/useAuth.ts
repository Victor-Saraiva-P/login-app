// src/hooks/useAuth.ts

import { useContext } from 'react';
// 1. IMPORTA O CONTEXTO do arquivo do provedor
import { AuthContext } from '../contexts/AuthContext'; 
import type { LoginRequestDTO } from '../../domains/user/features/authService';

// (A interface AuthContextType pode ser importada ou redefinida aqui)
interface AuthContextType {
  accessToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (data: LoginRequestDTO) => Promise<void>;
  logout: () => Promise<void>;
}

// 2. A FUNÇÃO DO HOOK VIVE AQUI E É EXPORTADA
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}