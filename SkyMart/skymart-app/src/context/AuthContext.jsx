import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "sonner";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("skymart_user", null);
  const [users, setUsers] = useLocalStorage("skymart_users_db", []);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const login = (email, password) => {
    const existingUser = users.find(u => u.email === email);
    if (!existingUser) {
      throw new Error("User not found");
    }
    // Simplistic password check (in a real app, use proper hashing/backend)
    if (existingUser.password !== btoa(password)) {
      throw new Error("Invalid credentials");
    }
    const safeUser = { id: existingUser.id, name: existingUser.name, email: existingUser.email };
    setUser(safeUser);
    return safeUser;
  };

  const register = (name, email, password) => {
    if (users.find(u => u.email === email)) {
      throw new Error("Email already registered");
    }
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password: btoa(password), // Naive encoding for mock purposes
      createdAt: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(safeUser);
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
