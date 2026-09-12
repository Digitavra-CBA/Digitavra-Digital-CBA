import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  History,
  Users,
  LogOut,
  UtensilsCrossed,
  BookOpenCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_BY_ROLE = {
  trainee: [
    { to: "/trainee", label: "Dashboard Trainee", icon: LayoutDashboard, end: true },
    { to: "/panduan/trainee", label: "Panduan Penggunaan", icon: BookOpenCheck },
  ],
  supervisor: [
    { to: "/supervisor", label: "Trainee Bimbingan", icon: Users, end: true },
    { to: "/supervisor/riwayat", label: "Riwayat Penilaian", icon: History },
    { to: "/panduan/supervisor", label: "Panduan Penggunaan", icon: BookOpenCheck },
  ],
  gm: [
    { to: "/gm", label: "Ringkasan", icon: LayoutDashboard, end: true },
    { to: "/gm/monitoring", label: "Monitoring Trainee", icon: ClipboardList },
    { to: "/panduan/gm", label: "Panduan Penggunaan", icon: BookOpenCheck },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const items = NAV_BY_ROLE[user?.role] || [];

  return (
    <aside className="flex h-full w-64 flex-col bg-ink-900 text-linen-100">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brass-500/20 text-brass-400">
          <UtensilsCrossed size={18} />
        </span>
        <div>
          <p className="font-display text-lg leading-tight text-linen-50">Digitavra</p>
          <p className="text-[11px] text-ink-300">Competency-Based Assessment</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors focus-ring ${
                isActive
                  ? "bg-brass-500/15 text-brass-400"
                  : "text-ink-300 hover:bg-white/5 hover:text-linen-100"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        <div className="mb-3 px-3">
          <p className="truncate text-sm text-linen-100">{user?.name}</p>
          <p className="text-xs capitalize text-ink-300">
            {user?.role === "gm" ? "General Manager" : user?.role}
          </p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-300 transition-colors hover:bg-white/5 hover:text-status-belum focus-ring"
        >
          <LogOut size={17} />
          Keluar
        </button>
      </div>
    </aside>
  );
}