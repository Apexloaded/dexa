"use client";

import useUser from "@/hooks/user.hook";
import { AuthData, UserInterface } from "@/interfaces/user.interface";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type AuthContextType = {
  ens?: string;
  progress?: number;
  logout: () => void;
  user?: UserInterface;
  profileProgress?: number;
  setProfileProgress: Dispatch<SetStateAction<number | undefined>>;
  isAuth: boolean;
  isAuthenticated: () => boolean;
  isAuthenticating: boolean;
};

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: Props) {
  const user = useUser();

  return (
    <AuthContext.Provider
      value={{
        ...user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
