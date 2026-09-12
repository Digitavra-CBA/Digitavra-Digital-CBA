import { createContext, useContext, useEffect, useState } from "react";
import { USERS } from "../lib/mockData";
import { getSession, setSession, clearSession } from "../lib/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  useEffect(() => {
    if (user) setSession(user);
  }, [user]);

  function login(username, password) {
    const found = USERS.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: "Username atau password salah." };
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    setSession(safeUser);
    return { ok: true, user: safeUser };
  }

  function logout() {
    setUser(null);
    clearSession();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
