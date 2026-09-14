import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TableSettingHero from "../components/TableSettingHero";
import { LogIn } from "lucide-react";

const ROLE_HOME = { trainee: "/trainee", supervisor: "/supervisor", gm: "/gm" };

// Akun demo untuk tombol isi-cepat di halaman login.
// Cuma perlu username & password (nilai yang memang sudah pasti/statis),
// jadi tidak perlu query ke Supabase hanya untuk menampilkan 3 tombol ini.
const DEMO_ACCOUNTS = [
  { label: "Trainee — Zidan Ramadhan", username: "zidan.trainee", password: "trainee123" },
  { label: "Supervisor — Dewi Anggraini", username: "dewi.supervisor", password: "super123" },
  { label: "General Manager — Hendra Kusuma", username: "hendra.gm", password: "gm123" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await login(username, password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      navigate(ROLE_HOME[result.user.role]);
    } finally {
      setSubmitting(false);
    }
  }

  function fillDemo(u) {
    setUsername(u.username);
    setPassword(u.password);
    setError("");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Panel kiri — hero table set-up */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink-900 p-12 text-linen-100 lg:flex">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brass-400">Digitavra</p>
          <h2 className="mt-4 max-w-sm font-display text-3xl leading-snug text-linen-50">
            DIGITAL COMPETENCY-BASED ASSESSMENT
          </h2>
          <p className="mt-4 max-w-sm text-sm text-ink-300">
            Platform assessment untuk memantau kompetensi trainee dalam pelaksanaan Jobs Performance Table Set-Up Restaurant di industri perhotelan.
          </p>
        </div>

        <div className="flex justify-center py-10">
          <TableSettingHero className="w-full max-w-md" />
        </div>

        <p className="text-xs text-ink-300">
          SOP No. 002/F&amp;B/PnP · Food and Beverage Service
        </p>
      </div>

      {/* Panel kanan — form login */}
      <div className="flex items-center justify-center bg-linen-100 px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <p className="text-xs uppercase tracking-[0.2em] text-brass-600">Digital CBA</p>
          </div>

          <h1 className="font-display text-2xl text-ink-900">Welcome to Digitavra</h1>
          <p className="mt-1 text-sm text-ink-500">
            Gunakan akun Trainee, Supervisor, atau General Manager.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                placeholder="cth. dewi.supervisor"
                className="w-full rounded-lg border border-linen-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus-ring"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-linen-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus-ring"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-status-belum-soft px-3 py-2 text-sm text-status-belum">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-medium text-linen-50 transition-colors hover:bg-ink-800 focus-ring disabled:opacity-60"
            >
              <LogIn size={16} />
              {submitting ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="mt-8 rounded-xl border border-linen-300 bg-linen-50 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-500">
              Akun demo
            </p>
            <div className="grid gap-1.5">
              {DEMO_ACCOUNTS.map((u) => (
                <button
                  key={u.username}
                  type="button"
                  onClick={() => fillDemo(u)}
                  className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs text-ink-700 transition-colors hover:bg-white focus-ring"
                >
                  <span>{u.label}</span>
                  <span className="text-ink-500">{u.username}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-ink-500">
            <span>Belum tahu cara pakai?</span>
            <Link to="/panduan/trainee" className="font-medium text-brass-600 hover:underline focus-ring">
              Panduan Trainee
            </Link>
            <span className="text-linen-300">·</span>
            <Link to="/panduan/supervisor" className="font-medium text-brass-600 hover:underline focus-ring">
              Panduan Supervisor
            </Link>
            <span className="text-linen-300">·</span>
            <Link to="/panduan/gm" className="font-medium text-brass-600 hover:underline focus-ring">
              Panduan GM
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
