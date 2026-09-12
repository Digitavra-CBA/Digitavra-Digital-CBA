import Sidebar from "./Sidebar";

export default function PageShell({ title, subtitle, actions, children }) {
  return (
    <div className="flex min-h-screen bg-linen-100">
      <Sidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b border-linen-300 bg-linen-50/90 px-8 py-5 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl text-ink-900">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
        </header>
        <main className="px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
