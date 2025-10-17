import {
  createContext,
  type ReactNode,
} from "react";
import {
  type LoginRequestDTO,
} from "../../domains/user/features/authService";

export interface AuthContextType {
  accessToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (data: LoginRequestDTO) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

