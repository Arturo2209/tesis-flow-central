
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

interface Advisor {
  id: string;
  nombre: string;
  especialidad: string;
  correo: string;
  descripcion: string;
  tesisAsignadas: number;
  maxTesis: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  thesis: ThesisData | null;
  advisors: Advisor[];
  login: () => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  updateThesis: (thesis: ThesisData) => void;
  getAvailableAdvisors: () => Advisor[];
  getAdvisorById: (id: string) => Advisor | undefined;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Datos simulados de asesores
const mockAdvisors: Advisor[] = [
  {
    id: '1',
    nombre: 'Dr. Carlos Mendoza',
    especialidad: 'Desarrollo de Software',
    correo: 'carlos.mendoza@tecsup.edu.pe',
    descripcion: 'Especialista en desarrollo web, móvil y arquitectura de software. 15 años de experiencia.',
    tesisAsignadas: 3,
    maxTesis: 7
  },
  {
    id: '2',
    nombre: 'Ing. María Torres',
    especialidad: 'Bases de Datos y Analytics',
    correo: 'maria.torres@tecsup.edu.pe',
    descripcion: 'Experta en bases de datos, Business Intelligence y análisis de datos.',
    tesisAsignadas: 5,
    maxTesis: 7
  },
  {
    id: '3',
    nombre: 'Mg. Roberto Silva',
    especialidad: 'Inteligencia Artificial',
    correo: 'roberto.silva@tecsup.edu.pe',
    descripcion: 'Especialista en Machine Learning, Deep Learning y visión por computadora.',
    tesisAsignadas: 2,
    maxTesis: 7
  },
  {
    id: '4',
    nombre: 'Dr. Ana Vargas',
    especialidad: 'Ciberseguridad',
    correo: 'ana.vargas@tecsup.edu.pe',
    descripcion: 'Experta en seguridad informática, ethical hacking y sistemas seguros.',
    tesisAsignadas: 6,
    maxTesis: 7
  },
  {
    id: '5',
    nombre: 'Ing. Luis Ramirez',
    especialidad: 'DevOps y Cloud',
    correo: 'luis.ramirez@tecsup.edu.pe',
    descripcion: 'Especialista en DevOps, Cloud Computing y automatización de procesos.',
    tesisAsignadas: 7,
    maxTesis: 7
  }
];

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

  const getAvailableAdvisors = () => {
    return mockAdvisors.filter(advisor => advisor.tesisAsignadas < advisor.maxTesis);
  };

  const getAdvisorById = (id: string) => {
    return mockAdvisors.find(advisor => advisor.id === id);
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      thesis,
      advisors: mockAdvisors,
      login,
      logout,
      updateProfile,
      updateThesis,
      getAvailableAdvisors,
      getAdvisorById,
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
