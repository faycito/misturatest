import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';

export type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isSignedIn: false,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
		setLoading(false);
	}, 1500)
  }, []);

  const signIn = async (newToken: string) => {
    setToken(newToken);
  };

  const signOut = async () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isSignedIn: !!token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
