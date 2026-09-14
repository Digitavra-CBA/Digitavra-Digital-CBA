import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserByUsername } from "../lib/supabaseData";
import { getSession, setSession, clearSession } from "../lib/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  useEffect(() => {
    if (user) setSession(user);
  }, [user]);

  async function login(username, password) {
    try {
      const found = await fetchUserByUsername(username.trim());
      if (!found || found.password !== password) {
        return { ok: false, error: "Username atau password salah." };
      }
      const { password: _pw, ...safeUser } = found;
      setUser(safeUser);
      setSession(safeUser);
      return { ok: true, user: safeUser };
    } catch (err) {
      return { ok: false, error: "Gagal terhubung ke server. Coba lagi." };
    }
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
