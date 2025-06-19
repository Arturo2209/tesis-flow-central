
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  isAuthenticated: boolean;
  profileCompleted: boolean;
}

interface UserProfile {
  codigo: string;
  carrera: string;
  ciclo: string;
  nombres: string;
}

interface ThesisData {
  nombre: string;
  ciclo: string;
  descripcion: string;
  asesorId: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  thesis: ThesisData | null;
  login: () => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  updateThesis: (thesis: ThesisData) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [thesis, setThesis] = useState<ThesisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial de datos del localStorage
    const savedUser = localStorage.getItem('thesia_user');
    const savedProfile = localStorage.getItem('thesia_profile');
    const savedThesis = localStorage.getItem('thesia_thesis');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    if (savedThesis) {
      setThesis(JSON.parse(savedThesis));
    }

    setIsLoading(false);
  }, []);

  const login = () => {
    const newUser: User = {
      id: '1',
      email: 'juan.silva@tecsup.edu.pe',
      isAuthenticated: true,
      profileCompleted: false
    };
    
    setUser(newUser);
    localStorage.setItem('thesia_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setThesis(null);
    localStorage.removeItem('thesia_user');
    localStorage.removeItem('thesia_profile');
    localStorage.removeItem('thesia_thesis');
  };

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('thesia_profile', JSON.stringify(newProfile));
    
    if (user) {
      const updatedUser = { ...user, profileCompleted: true };
      setUser(updatedUser);
      localStorage.setItem('thesia_user', JSON.stringify(updatedUser));
    }
  };

  const updateThesis = (newThesis: ThesisData) => {
    setThesis(newThesis);
    localStorage.setItem('thesia_thesis', JSON.stringify(newThesis));
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      thesis,
      login,
      logout,
      updateProfile,
      updateThesis,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
