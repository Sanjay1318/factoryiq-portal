import { useState } from "react";

// ─── Theme ────────────────────────────────────────────────────────────────────
const C = {
  bg: "#0a0f1e",
  panel: "#0e1628",
  card: "#111d35",
  border: "#1e2e50",
  accent: "#00c6ff",
  accentGlow: "#00c6ff33",
  accentAlt: "#ff6b35",
  success: "#00e5a0",
  warning: "#ffc107",
  danger: "#ff4d6d",
  text: "#e8edf8",
  muted: "#6b7a99",
  sub: "#94a3b8",
};

// ─── Demo Users ───────────────────────────────────────────────────────────────
const USERS = {
  admin:    { password: "admin123", role: "admin",    name: "Alex Morgan",  title: "Manufacturing Director" },
  employee: { password: "emp123",   role: "employee", name: "Jordan Kim",   title: "Quality Engineer" },
};

// ─── Shared Style Helpers ─────────────────────────────────────────────────────
const S = {
  card: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: "20px 24px",
  },
  badge: (color) => ({
    display: "inline-flex", alignItems: "center",
    padding: "3px 10px", borderRadius: 20,
    fontSize: 11, fontWeight: 700,
    background: color + "22", color,
    border: `1px solid ${color}44`,
    letterSpacing: "0.04em", textTransform: "uppercase",
    whiteSpace: "nowrap",
  }),
  btn: (variant = "primary") => ({
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "9px 18px", borderRadius: 8,
    fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none",
    transition: "opacity 0.15s",
    background:
      variant === "primary" ? C.accent :
      variant === "danger"  ? C.danger :
      variant === "ghost"   ? C.border : C.border,
    color: (variant === "primary" || variant === "danger") ? "#0a0f1e" : C.text,
  }),
  input: {
    background: "#070d1a",
    border: `1px solid ${C.border}`,
    borderRadius: 8, color: C.text,
    padding: "10px 14px", fontSize: 14, width: "100%", outline: "none",
  },
  label: {
    fontSize: 11, color: C.muted, marginBottom: 6,
    display: "block", fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase",
  },
  th: {
    padding: "10px 14px", textAlign: "left",
    borderBottom: `1px solid ${C.border}`,
    color: C.muted, fontSize: 11, fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  td: {
    padding: "12px 14px",
    borderBottom: `1px solid ${C.border}18`,
    verticalAlign: "middle", fontSize: 13,
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
function Icon({ n, size = 18, color = "currentColor" }) {
  const p = { width: size, height: size, fill: "none", stroke: color, strokeWidth: "2", viewBox: "0 0 24 24" };
  const icons = {
    dashboard:    <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    programs:     <svg {...p}><path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z"/></svg>,
    production:   <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
    quality:      <svg {...p}><path d="M9 12l2 2 4-4"/><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    supply:       <svg {...p}><path d="M3 3h18l-2 9H5L3 3z"/><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></svg>,
    afterSales:   <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    collab:       <svg {...p}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    analytics:    <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    users:        <svg {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    settings:     <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    logout:       <svg {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
    bell:         <svg {...p}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
    plus:         <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    check:        <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>,
    alert:        <svg {...p}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    doc:          <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    box:          <svg {...p}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    wrench:       <svg {...p}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
    tasks:        <svg {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    upload:       <svg {...p}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
    download:     <svg {...p}><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/></svg>,
    integrations: <svg {...p}><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 9v4a3 3 0 003 3h9"/></svg>,
    search:       <svg {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    edit:         <svg {...p}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash:        <svg {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
    refresh:      <svg {...p}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
    filter:       <svg {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  };
  return icons[n] || <svg {...p}/>;
}

// ─── Reusable Components ──────────────────────────────────────────────────────
function StatCard({ label, value, sub, color = C.accent, icon }) {
  return (
    <div style={S.card}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 700, marginBottom: 8 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
        </div>
        <div style={{ width: 42, height: 42, background: color + "18", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon n={icon} size={20} color={color} />
        </div>
      </div>
      {sub && <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function SectionHeader({ title, action, actionLabel, icon = "plus" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.text }}>{title}</h3>
      {action && (
        <button onClick={action} style={{ ...S.btn("primary"), padding: "7px 14px", fontSize: 12 }}>
          <Icon n={icon} size={13} />{actionLabel}
        </button>
      )}
    </div>
  );
}

function Topbar({ title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.025em", color: C.text }}>{title}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, position: "relative", padding: 4 }}>
          <Icon n="bell" size={20} />
          <span style={{ position: "absolute", top: 2, right: 2, width: 7, height: 7, background: C.danger, borderRadius: "50%", border: `2px solid ${C.bg}` }} />
        </button>
        <div style={{ fontSize: 12, color: C.muted, background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 10px" }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ value, color = C.accent, height = 6 }) {
  return (
    <div style={{ height, background: C.border, borderRadius: height }}>
      <div style={{ height: "100%", width: `${Math.min(100, value)}%`, background: color, borderRadius: height, transition: "width 0.4s ease" }} />
    </div>
  );
}

function AlertBar({ message }) {
  return (
    <div style={{ background: `${C.warning}12`, border: `1px solid ${C.warning}40`, borderRadius: 10, padding: "11px 18px", marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
      <Icon n="alert" size={16} color={C.warning} />
      <span style={{ fontSize: 13, color: C.warning, fontWeight: 500 }}>{message}</span>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...S.card, width: 520, maxHeight: "85vh", overflowY: "auto", boxShadow: `0 0 80px ${C.accentGlow}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username || !password) { setError("Please enter username and password."); return; }
    setLoading(true); setError("");
    setTimeout(() => {
      const u = USERS[username.toLowerCase()];
      if (u && u.password === password) {
        onLogin({ username: username.toLowerCase(), ...u });
      } else {
        setError("Invalid credentials. Use admin/admin123 or employee/emp123");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border}30 1px,transparent 1px),linear-gradient(90deg,${C.border}30 1px,transparent 1px)`, backgroundSize: "44px 44px" }} />
      {/* Glow */}
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 700, height: 320, background: `radial-gradient(ellipse,${C.accentGlow} 0%,transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ position: "relative", width: 440, zIndex: 1 }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{ width: 52, height: 52, background: `linear-gradient(135deg,${C.accent},#0055ff)`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px ${C.accentGlow}` }}>
              <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="9" height="9" rx="1.5"/><rect x="13" y="2" width="9" height="9" rx="1.5"/>
                <rect x="2" y="13" width="9" height="9" rx="1.5"/><rect x="13" y="13" width="9" height="9" rx="1.5"/>
              </svg>
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: C.text }}>Nexgile</div>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: -2 }}>FactoryIQ Portal</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: C.sub, lineHeight: 1.6 }}>Manufacturing Excellence Platform<br/>Single portal for end-to-end visibility</p>
        </div>

        <div style={{ ...S.card, boxShadow: `0 4px 60px ${C.accentGlow}` }}>
          <h2 style={{ margin: "0 0 22px", fontSize: 18, fontWeight: 700 }}>Sign In to Your Workspace</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Username</label>
            <input style={S.input} value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. admin or employee" onKeyDown={e => e.key === "Enter" && handleLogin()} autoFocus />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>Password</label>
            <input type="password" style={S.input} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          {error && <div style={{ background: `${C.danger}15`, border: `1px solid ${C.danger}44`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.danger, marginBottom: 16 }}>{error}</div>}
          <button onClick={handleLogin} disabled={loading} style={{ ...S.btn("primary"), width: "100%", justifyContent: "center", padding: "13px", fontSize: 14, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Authenticating…" : "Sign In →"}
          </button>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, color: C.muted, textAlign: "center", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Quick Demo Access</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[["admin","admin123","Admin","#ff6b3530","#ff6b35"],["employee","emp123","Employee","#00c6ff22","#00c6ff"]].map(([u,p,l,bg,col]) => (
                <button key={u} onClick={() => { setUsername(u); setPassword(p); }} style={{ flex: 1, padding: "9px", background: bg, border: `1px solid ${col}44`, borderRadius: 8, color: col, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {l} Role
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: C.muted }}>
          Role-based access · Customer segregation · Multi-site support
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ user, active, setActive, onLogout }) {
  const adminNav = [
    { id: "dashboard",    label: "Dashboard",          icon: "dashboard" },
    { id: "programs",     label: "Programs & Projects", icon: "programs" },
    { id: "production",   label: "Production",          icon: "production" },
    { id: "quality",      label: "Quality & Compliance",icon: "quality" },
    { id: "supply",       label: "Supply Chain",        icon: "supply" },
    { id: "afterSales",   label: "After-Sales",         icon: "afterSales" },
    { id: "collab",       label: "Collaboration & Docs",icon: "collab" },
    { id: "analytics",    label: "Analytics & Reports", icon: "analytics" },
    { id: "integrations", label: "Integrations",        icon: "integrations" },
    { id: "users",        label: "User Management",     icon: "users" },
    { id: "settings",     label: "Settings",            icon: "settings" },
  ];
  const empNav = [
    { id: "dashboard",  label: "My Dashboard",    icon: "dashboard" },
    { id: "programs",   label: "My Programs",      icon: "programs" },
    { id: "production", label: "Production View",  icon: "production" },
    { id: "quality",    label: "Quality Tasks",    icon: "quality" },
    { id: "supply",     label: "Supply Visibility",icon: "supply" },
    { id: "afterSales", label: "After-Sales",      icon: "afterSales" },
    { id: "collab",     label: "Collaboration",    icon: "collab" },
    { id: "analytics",  label: "My Reports",       icon: "analytics" },
  ];
  const nav = user.role === "admin" ? adminNav : empNav;

  return (
    <div style={{ width: 248, minHeight: "100vh", background: C.panel, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 200 }}>
      {/* Logo */}
      <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: `linear-gradient(135deg,${C.accent},#0055ff)`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="19" height="19" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="9" height="9" rx="1.5"/><rect x="13" y="2" width="9" height="9" rx="1.5"/>
              <rect x="2" y="13" width="9" height="9" rx="1.5"/><rect x="13" y="13" width="9" height="9" rx="1.5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>FactoryIQ</div>
            <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>by Nexgile</div>
          </div>
        </div>
      </div>

      {/* User card */}
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, background: `${C.accent}07` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: user.role === "admin" ? `${C.accentAlt}33` : `${C.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: user.role === "admin" ? C.accentAlt : C.accent, flexShrink: 0 }}>
            {user.name.split(" ").map(w => w[0]).join("")}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{user.name}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{user.title}</div>
          </div>
        </div>
        <span style={{ ...S.badge(user.role === "admin" ? C.accentAlt : C.accent), marginTop: 8, fontSize: 10 }}>
          {user.role === "admin" ? "Administrator" : "Employee"}
        </span>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto" }}>
        {nav.map(item => {
          const on = active === item.id;
          return (
            <button key={item.id} onClick={() => setActive(item.id)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              padding: "9px 11px", borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2,
              background: on ? `${C.accent}18` : "transparent",
              color: on ? C.accent : C.sub,
              fontWeight: on ? 700 : 400, fontSize: 13, textAlign: "left",
              transition: "all 0.13s",
              borderLeft: on ? `3px solid ${C.accent}` : "3px solid transparent",
            }}>
              <Icon n={item.icon} size={15} color={on ? C.accent : C.muted} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "10px", borderTop: `1px solid ${C.border}` }}>
        <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 11px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: C.danger, fontSize: 13, fontWeight: 500 }}>
          <Icon n="logout" size={15} color={C.danger} /> Sign Out
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
function DashboardModule({ user }) {
  const isAdmin = user.role === "admin";

  const adminStats = [
    { label: "Active Programs",   value: "24",    sub: "6 R&D · 18 Production",   color: C.accent,    icon: "programs" },
    { label: "Production Lines",  value: "8/12",  sub: "8 lines running today",    color: C.success,   icon: "production" },
    { label: "Open NCRs",        value: "14",    sub: "3 critical · 11 minor",    color: C.danger,    icon: "quality" },
    { label: "Shipments Today",   value: "32",    sub: "94% on-time delivery",     color: C.warning,   icon: "supply" },
  ];
  const empStats = [
    { label: "My Active Tasks",   value: "7",     sub: "2 overdue",                color: C.accent,    icon: "tasks" },
    { label: "Quality Checks",    value: "3",     sub: "Due today",                color: C.warning,   icon: "quality" },
    { label: "Open CAPAs",        value: "2",     sub: "Assigned to me",           color: C.danger,    icon: "alert" },
    { label: "Pending Docs",      value: "18",    sub: "Awaiting review",          color: C.success,   icon: "doc" },
  ];

  const activity = [
    { type: "NCR",     id: "NCR-2041", desc: "Solder defect on Line 4 – Board Assembly",     time: "2h ago",  status: "Open",        sc: C.danger },
    { type: "Shipment",id: "SHP-8872", desc: "PO #44123 dispatched to Customer A",           time: "3h ago",  status: "Shipped",     sc: C.success },
    { type: "ECO",     id: "ECO-0312", desc: "BOM revision for PCB-X200 approved",           time: "5h ago",  status: "Approved",    sc: C.accent },
    { type: "CAPA",    id: "CAP-0089", desc: "Root cause analysis complete – Fishbone done", time: "1d ago",  status: "In Progress", sc: C.warning },
    { type: "Audit",   id: "AUD-0021", desc: "ISO 9001 internal audit scheduled for Q2",     time: "2d ago",  status: "Scheduled",   sc: C.sub },
  ];

  const lines = [["Line 1 – SMT", 88, C.success], ["Line 2 – THT", 72, C.accent], ["Line 3 – Coating", 95, C.danger], ["Line 4 – Final Assy", 63, C.warning]];
  const schedule = [["Quality Inspection – Line 2","09:00",C.accent],["CAPA Review Meeting","11:30",C.warning],["ECO-0312 Sign-off","14:00",C.success],["Audit Prep – ISO docs","16:00",C.sub]];

  return (
    <div>
      <Topbar title={isAdmin ? "Operations Overview" : "My Workspace"} />
      <AlertBar message={isAdmin
        ? "3 critical NCRs require immediate action · ISO cert renewal due in 14 days · Line 3 capacity at 95%"
        : "2 quality checks overdue · CAPA-0089 deadline in 2 days · New document pending your sign-off"
      }/>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 26 }}>
        {(isAdmin ? adminStats : empStats).map((s,i) => <StatCard key={i} {...s}/>)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Activity */}
        <div style={S.card}>
          <SectionHeader title="Recent Activity" />
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>
              {["Type · ID","Description","When","Status"].map(h => <th key={h} style={S.th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {activity.map((a,i) => (
                <tr key={i} style={{ cursor:"pointer" }}>
                  <td style={S.td}>
                    <span style={S.badge(a.sc)}>{a.type}</span>
                    <span style={{ fontSize:11, color:C.muted, marginLeft:6 }}>{a.id}</span>
                  </td>
                  <td style={{ ...S.td, maxWidth:240 }}>{a.desc}</td>
                  <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{a.time}</td>
                  <td style={S.td}><span style={S.badge(a.sc)}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Line util / schedule */}
          <div style={S.card}>
            <SectionHeader title={isAdmin ? "Line Utilization" : "Today's Schedule"} />
            {isAdmin
              ? lines.map(([l,v,c],i) => (
                  <div key={i} style={{ marginBottom:12 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                      <span style={{ color:C.sub }}>{l}</span>
                      <span style={{ color:c, fontWeight:700 }}>{v}%</span>
                    </div>
                    <ProgressBar value={v} color={c}/>
                  </div>
                ))
              : schedule.map(([t,time,c],i) => (
                  <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10 }}>
                    <span style={{ ...S.badge(c), fontSize:10 }}>{time}</span>
                    <span style={{ fontSize:12, color:C.sub, lineHeight:1.4 }}>{t}</span>
                  </div>
                ))
            }
          </div>

          {isAdmin && (
            <div style={S.card}>
              <SectionHeader title="Quick Actions" />
              {[["Raise NCR","quality",C.danger],["Log Production","production",C.success],["Upload Document","upload",C.accent],["New Shipment","supply",C.warning]].map(([l,ic,c]) => (
                <button key={l} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"9px 12px", background:c+"12", border:`1px solid ${c}30`, borderRadius:8, color:c, fontSize:13, fontWeight:500, cursor:"pointer", marginBottom:8 }}>
                  <Icon n={ic} size={14} color={c}/>{l}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: PROGRAMS & PROJECTS
// ═══════════════════════════════════════════════════════════════════════════════
function ProgramsModule({ user }) {
  const isAdmin = user.role === "admin";
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [programs, setPrograms] = useState([
    { id:"PRG-001", name:"PCB-X200 NPI",         type:"R&D",        status:"In Review",    owner:"Alex Morgan",  site:"Hyderabad", progress:45, health:"Yellow", due:"Mar 15" },
    { id:"PRG-002", name:"Controller-V3 Prod",   type:"Production", status:"Active",       owner:"Jordan Kim",   site:"Chennai",   progress:72, health:"Green",  due:"Apr 02" },
    { id:"PRG-003", name:"PowerModule Rev B",    type:"Production", status:"Active",       owner:"Sam Patel",    site:"Pune",      progress:91, health:"Green",  due:"Feb 28" },
    { id:"PRG-004", name:"SensorArray-G5 NPI",   type:"R&D",        status:"Qualification",owner:"Lee Chen",     site:"Hyderabad", progress:30, health:"Red",    due:"May 20" },
    { id:"PRG-005", name:"Legacy PCB EOL",       type:"End-of-Life",status:"Closing",      owner:"Alex Morgan",  site:"Pune",      progress:95, health:"Green",  due:"Mar 01" },
  ]);
  const [form, setForm] = useState({ name:"", type:"R&D", owner:"", site:"Hyderabad", due:"" });

  const hc = { Green:C.success, Yellow:C.warning, Red:C.danger };
  const filtered = filter === "All" ? programs : programs.filter(p => p.type === filter);

  const addProgram = () => {
    if (!form.name) return;
    setPrograms([...programs, { ...form, id:`PRG-00${programs.length+1}`, status:"Active", progress:0, health:"Green" }]);
    setShowModal(false); setForm({ name:"", type:"R&D", owner:"", site:"Hyderabad", due:"" });
  };

  return (
    <div>
      <Topbar title={isAdmin ? "Programs & Projects" : "My Programs"} />
      <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
        {["All","R&D","Production","End-of-Life"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ ...S.btn("ghost"), padding:"7px 16px", fontSize:12, background: filter===f ? C.accent : C.card, color: filter===f ? "#0a0f1e" : C.sub, border:`1px solid ${filter===f ? C.accent : C.border}` }}>{f}</button>
        ))}
        {isAdmin && <button onClick={() => setShowModal(true)} style={{ ...S.btn("primary"), marginLeft:"auto", padding:"7px 14px", fontSize:12 }}><Icon n="plus" size={13}/>New Program</button>}
      </div>

      <div style={S.card}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>{["ID","Program","Type","Status","Owner","Site","Progress","Health","Due"].concat(isAdmin?["Actions"]:[]).map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((p,i) => (
              <tr key={i}>
                <td style={{ ...S.td, fontSize:11, color:C.muted }}>{p.id}</td>
                <td style={{ ...S.td, fontWeight:700 }}>{p.name}</td>
                <td style={S.td}><span style={S.badge(C.accent)}>{p.type}</span></td>
                <td style={S.td}><span style={S.badge(p.status==="Active"?C.success:p.status==="Closing"?C.muted:C.warning)}>{p.status}</span></td>
                <td style={{ ...S.td, color:C.sub }}>{p.owner}</td>
                <td style={{ ...S.td, color:C.sub }}>{p.site}</td>
                <td style={{ ...S.td, minWidth:110 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ flex:1 }}><ProgressBar value={p.progress} color={hc[p.health]}/></div>
                    <span style={{ fontSize:11, color:C.muted, width:32 }}>{p.progress}%</span>
                  </div>
                </td>
                <td style={S.td}><span style={{ ...S.badge(hc[p.health]), fontSize:10 }}>{p.health}</span></td>
                <td style={{ ...S.td, fontSize:12, color:C.muted }}>{p.due}</td>
                {isAdmin && <td style={S.td}><button style={{ ...S.btn("ghost"), padding:"4px 10px", fontSize:11, background:C.border }}>Edit</button></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stage gates */}
      <div style={{ ...S.card, marginTop:20 }}>
        <SectionHeader title="R&D / NPI Stage Gate Pipeline" action={isAdmin ? ()=>{} : null} actionLabel="Schedule Review"/>
        <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:4 }}>
          {[["Requirements",4,C.success],["Design Review",2,C.success],["Prototype",3,C.success],["Qualification",1,C.warning],["FAI / PPAP",0,C.muted],["Production",0,C.muted]].map(([s,n,c],i) => (
            <div key={i} style={{ flex:"0 0 140px", padding:"14px 12px", background: n>0?`${c}12`:C.bg, borderRadius:9, border:`1px solid ${n>0?c:C.border}40`, textAlign:"center" }}>
              <div style={{ fontSize:10, fontWeight:800, color: n>0?c:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>{s}</div>
              <div style={{ fontSize:26, fontWeight:800, color:C.text }}>{n}</div>
              <div style={{ fontSize:11, color:C.muted }}>program{n!==1?"s":""}</div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal title="Add New Program" onClose={() => setShowModal(false)}>
          {[["Program Name","name","text"],["Owner","owner","text"],["Due Date","due","date"]].map(([l,k,t]) => (
            <div key={k} style={{ marginBottom:14 }}>
              <label style={S.label}>{l}</label>
              <input type={t} style={S.input} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} placeholder={`Enter ${l.toLowerCase()}`}/>
            </div>
          ))}
          <div style={{ marginBottom:14 }}>
            <label style={S.label}>Type</label>
            <select style={{ ...S.input }} value={form.type} onChange={e => setForm({...form,type:e.target.value})}>
              {["R&D","Production","End-of-Life"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={S.label}>Site</label>
            <select style={{ ...S.input }} value={form.site} onChange={e => setForm({...form,site:e.target.value})}>
              {["Hyderabad","Chennai","Pune"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={addProgram} style={{ ...S.btn("primary"), flex:1, justifyContent:"center" }}>Add Program</button>
            <button onClick={()=>setShowModal(false)} style={{ ...S.btn("ghost"), flex:1, justifyContent:"center", border:`1px solid ${C.border}` }}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: PRODUCTION
// ═══════════════════════════════════════════════════════════════════════════════
function ProductionModule({ user }) {
  const isAdmin = user.role === "admin";
  const lines = [
    { name:"Line 1 – SMT",        wip:245, yield:98.2, out:1240, plan:1300, rework:8,  shift:"Day",   status:"Running" },
    { name:"Line 2 – THT",        wip:112, yield:96.8, out:880,  plan:900,  rework:14, shift:"Day",   status:"Running" },
    { name:"Line 3 – Coating",    wip:78,  yield:99.1, out:520,  plan:520,  rework:2,  shift:"Eve",   status:"Running" },
    { name:"Line 4 – Final Assy", wip:56,  yield:94.5, out:310,  plan:400,  rework:21, shift:"Night", status:"Issue" },
  ];
  const defects = [["Solder Bridge",18],["Cold Solder",12],["Missing Component",7],["Misalignment",5],["PCB Damage",3]];
  const defColors = [C.danger,C.warning,C.accent,C.sub,C.muted];

  return (
    <div>
      <Topbar title="Production Visibility" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        <StatCard label="Lines Running"  value="3/4"   sub="1 with open issue"       color={C.warning} icon="production"/>
        <StatCard label="Total WIP"      value="491"   sub="Across all lines"        color={C.accent}  icon="box"/>
        <StatCard label="Average Yield"  value="97.2%" sub="+0.4% vs yesterday"      color={C.success} icon="check"/>
        <StatCard label="Rework Items"   value="45"    sub="Flagged for rework"      color={C.danger}  icon="wrench"/>
      </div>

      <div style={{ ...S.card, marginBottom:20 }}>
        <SectionHeader title="Line Performance Dashboard" action={isAdmin?()=>{}:null} actionLabel="Log Entry"/>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>{["Line","Status","Shift","WIP","Output vs Plan","Yield","Rework","AOI/X-Ray"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {lines.map((l,i) => (
              <tr key={i}>
                <td style={{ ...S.td, fontWeight:700 }}>{l.name}</td>
                <td style={S.td}><span style={S.badge(l.status==="Running"?C.success:C.danger)}>{l.status}</span></td>
                <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{l.shift}</td>
                <td style={{ ...S.td, color:C.accent, fontWeight:700 }}>{l.wip}</td>
                <td style={{ ...S.td, minWidth:140 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <div style={{ flex:1 }}><ProgressBar value={Math.min(100,(l.out/l.plan)*100)} color={l.out>=l.plan?C.success:C.warning}/></div>
                    <span style={{ fontSize:11, color:C.muted }}>{l.out}/{l.plan}</span>
                  </div>
                </td>
                <td style={{ ...S.td, color:l.yield>=97?C.success:C.warning, fontWeight:700 }}>{l.yield}%</td>
                <td style={{ ...S.td, color:l.rework>15?C.danger:C.sub, fontWeight:l.rework>15?700:400 }}>{l.rework}</td>
                <td style={S.td}><span style={S.badge(C.success)}>Pass</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20 }}>
        <div style={S.card}>
          <SectionHeader title="Top Defects – Pareto"/>
          {defects.map(([d,n],i) => (
            <div key={d} style={{ marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3 }}>
                <span style={{ color:C.sub }}>{d}</span>
                <span style={{ color:defColors[i], fontWeight:700 }}>{n}</span>
              </div>
              <ProgressBar value={(n/18)*100} color={defColors[i]} height={8}/>
            </div>
          ))}
        </div>

        <div style={S.card}>
          <SectionHeader title="Capacity – Site View"/>
          {[["Hyderabad – Main",78,C.warning],["Chennai – Unit 2",85,C.danger],["Pune – Fab",61,C.success]].map(([s,v,c]) => (
            <div key={s} style={{ marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5 }}>
                <span style={{ color:C.sub }}>{s}</span>
                <span style={{ color:c, fontWeight:700 }}>{v}%</span>
              </div>
              <ProgressBar value={v} color={c} height={10}/>
              <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{v>80?"⚠ Near constraint":"Nominal"}</div>
            </div>
          ))}
        </div>

        <div style={S.card}>
          <SectionHeader title="Shift Changeovers"/>
          {[["Day → Eve","Line 3","18:00","Planned"],["Eve → Night","Line 4","22:00","Planned"],["Night → Day","Line 1","06:00","Completed"]].map(([t,l,time,s],i) => (
            <div key={i} style={{ padding:"10px 0", borderBottom: i<2?`1px solid ${C.border}`:"none" }}>
              <div style={{ fontSize:13, fontWeight:600 }}>{t}</div>
              <div style={{ display:"flex", gap:10, marginTop:5 }}>
                <span style={S.badge(C.accent)}>{l}</span>
                <span style={{ fontSize:11, color:C.muted }}>{time}</span>
                <span style={S.badge(s==="Completed"?C.success:C.warning)}>{s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: QUALITY & COMPLIANCE
// ═══════════════════════════════════════════════════════════════════════════════
function QualityModule({ user }) {
  const isAdmin = user.role === "admin";
  const [showNCRModal, setShowNCRModal] = useState(false);
  const [ncrs, setNcrs] = useState([
    { id:"NCR-2041", type:"NCR",   desc:"Solder defect Line 4 – Board Assembly",          sev:"Critical",    status:"Open",        assignee:"Jordan Kim",  date:"Feb 26" },
    { id:"CAP-0089", type:"CAPA",  desc:"Root cause 5-Why complete, action pending",       sev:"Major",       status:"In Progress", assignee:"Jordan Kim",  date:"Feb 20" },
    { id:"NCR-2039", type:"NCR",   desc:"Coating thickness OOT – Station 3",              sev:"Minor",       status:"Closed",      assignee:"Sam Patel",   date:"Feb 18" },
    { id:"AUD-0021", type:"Audit", desc:"ISO 9001 Internal Audit – Q1 2025",              sev:"–",           status:"Scheduled",   assignee:"Alex Morgan", date:"Feb 15" },
    { id:"NCR-2040", type:"NCR",   desc:"Missing conformal coat on PCB-A batch 221",      sev:"Major",       status:"Open",        assignee:"Lee Chen",    date:"Feb 22" },
  ]);
  const [ncrForm, setNcrForm] = useState({ desc:"", sev:"Minor", assignee:"" });

  const addNCR = () => {
    if (!ncrForm.desc) return;
    setNcrs([{ id:`NCR-${2042+ncrs.length}`, type:"NCR", status:"Open", date:"Today", ...ncrForm }, ...ncrs]);
    setShowNCRModal(false); setNcrForm({ desc:"", sev:"Minor", assignee:"" });
  };

  const certs = [
    { name:"ISO 9001:2015",  status:"Active",        expires:"Jun 2025", site:"Hyderabad" },
    { name:"IATF 16949",     status:"Active",        expires:"Aug 2025", site:"Chennai" },
    { name:"NADCAP",         status:"Active",        expires:"Mar 2025", site:"Pune" },
    { name:"FDA 21 CFR",     status:"Expiring Soon", expires:"Mar 14",   site:"All" },
    { name:"AS9100D",        status:"Active",        expires:"Dec 2025", site:"Hyderabad" },
  ];

  const sevColor = s => s==="Critical"?C.danger:s==="Major"?C.warning:s==="Minor"?C.accent:C.muted;
  const stColor  = s => s==="Open"?C.danger:s==="Closed"?C.success:s==="Scheduled"?C.accent:C.warning;

  return (
    <div>
      <Topbar title="Quality & Compliance" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        <StatCard label="Open NCRs"      value="14" sub="3 critical · 11 minor"     color={C.danger}   icon="alert"/>
        <StatCard label="Open CAPAs"     value="6"  sub="2 overdue"                 color={C.warning}  icon="tasks"/>
        <StatCard label="Audits Q1"      value="4"  sub="1 scheduled · 2 closed"    color={C.accent}   icon="check"/>
        <StatCard label="Cert Renewals"  value="2"  sub="Due within 30 days"        color={C.accentAlt}icon="doc"/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:20 }}>
        <div style={S.card}>
          <SectionHeader title="NCR / CAPA / Audit Tracker" action={isAdmin?()=>setShowNCRModal(true):null} actionLabel="Raise NCR"/>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>{["ID","Type","Description","Severity","Status","Assignee","Date"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
            <tbody>
              {ncrs.map((n,i) => (
                <tr key={i}>
                  <td style={{ ...S.td, color:C.accent, fontWeight:700, fontSize:12 }}>{n.id}</td>
                  <td style={S.td}><span style={S.badge(n.type==="NCR"?C.danger:n.type==="CAPA"?C.warning:C.accent)}>{n.type}</span></td>
                  <td style={{ ...S.td, maxWidth:220, fontSize:12 }}>{n.desc}</td>
                  <td style={S.td}><span style={S.badge(sevColor(n.sev))}>{n.sev}</span></td>
                  <td style={S.td}><span style={S.badge(stColor(n.status))}>{n.status}</span></td>
                  <td style={{ ...S.td, color:C.sub, fontSize:12 }}>{n.assignee}</td>
                  <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{n.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={S.card}>
            <SectionHeader title="Certification Library" action={isAdmin?()=>{}:null} actionLabel="Upload" icon="upload"/>
            {certs.map((c,i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"9px 0", borderBottom:i<certs.length-1?`1px solid ${C.border}`:"none" }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{c.name}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{c.site} · Exp: {c.expires}</div>
                </div>
                <span style={S.badge(c.status==="Active"?C.success:C.warning)}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SPC */}
      <div style={S.card}>
        <SectionHeader title="SPC & Quality Analytics"/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14 }}>
          {[["Cp Index","1.42",C.success,"Solder Paste"],["Cpk Index","1.28",C.success,"Solder Paste"],["Escaped Defects","3",C.warning,"This Month"],["Yield Trend","↑+0.4%",C.success,"7-day avg"],["Gage R&R","12%",C.success,"Acceptable"]].map(([l,v,c,sub]) => (
            <div key={l} style={{ background:C.bg, borderRadius:10, padding:"14px 16px", border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>{l}</div>
              <div style={{ fontSize:22, fontWeight:800, color:c }}>{v}</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {showNCRModal && (
        <Modal title="Raise New NCR" onClose={() => setShowNCRModal(false)}>
          <div style={{ marginBottom:14 }}>
            <label style={S.label}>Description</label>
            <textarea style={{ ...S.input, height:80, resize:"vertical" }} value={ncrForm.desc} onChange={e=>setNcrForm({...ncrForm,desc:e.target.value})} placeholder="Describe the non-conformance…"/>
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={S.label}>Severity</label>
            <select style={S.input} value={ncrForm.sev} onChange={e=>setNcrForm({...ncrForm,sev:e.target.value})}>
              {["Critical","Major","Minor"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={S.label}>Assignee</label>
            <input style={S.input} value={ncrForm.assignee} onChange={e=>setNcrForm({...ncrForm,assignee:e.target.value})} placeholder="Name of assignee"/>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={addNCR} style={{ ...S.btn("primary"), flex:1, justifyContent:"center" }}>Submit NCR</button>
            <button onClick={()=>setShowNCRModal(false)} style={{ ...S.btn("ghost"), flex:1, justifyContent:"center", border:`1px solid ${C.border}` }}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: SUPPLY CHAIN
// ═══════════════════════════════════════════════════════════════════════════════
function SupplyModule({ user }) {
  const isAdmin = user.role === "admin";
  const pos = [
    { po:"PO-44123", supplier:"Vishay India",      item:"Capacitor 100uF", qty:5000,  status:"In Transit", eta:"Mar 02", lt:"14d" },
    { po:"PO-44098", supplier:"Mouser Electronics", item:"IC LM741",        qty:1200,  status:"Delivered",  eta:"Feb 25", lt:"7d" },
    { po:"PO-44071", supplier:"TTI Inc",            item:"PCB Bare Board",  qty:400,   status:"Delayed",    eta:"Mar 08", lt:"21d" },
    { po:"PO-44065", supplier:"Arrow Electronics",  item:"JST Connectors",  qty:10000, status:"Confirmed",  eta:"Mar 04", lt:"10d" },
    { po:"PO-44120", supplier:"Digi-Key India",     item:"MCU STM32F4",     qty:600,   status:"In Transit", eta:"Mar 05", lt:"12d" },
  ];
  const inv = [
    { item:"Capacitor 100uF",  stock:3200, alloc:2800, min:1000, status:"OK" },
    { item:"IC LM741",         stock:240,  alloc:200,  min:300,  status:"Low" },
    { item:"PCB Bare Board",   stock:80,   alloc:80,   min:100,  status:"Critical" },
    { item:"JST Connectors",   stock:8400, alloc:4200, min:2000, status:"OK" },
    { item:"MCU STM32F4",      stock:120,  alloc:100,  min:150,  status:"Low" },
  ];
  const scColor = s => s==="Delivered"?C.success:s==="Delayed"?C.danger:s==="In Transit"?C.accent:C.muted;
  const invColor = s => s==="OK"?C.success:s==="Low"?C.warning:C.danger;

  return (
    <div>
      <Topbar title="Supply Chain & Materials Visibility" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        <StatCard label="Open POs"        value="18"  sub="4 delayed"               color={C.accent}  icon="supply"/>
        <StatCard label="In Transit"      value="7"   sub="Shipments en route"       color={C.warning} icon="box"/>
        <StatCard label="Below Threshold" value="3"   sub="Critical stock items"     color={C.danger}  icon="alert"/>
        <StatCard label="Active Suppliers"value="24"  sub="Across 3 regions"        color={C.success} icon="users"/>
      </div>

      <div style={{ ...S.card, marginBottom:20 }}>
        <SectionHeader title="Purchase Orders & Shipments" action={isAdmin?()=>{}:null} actionLabel="New PO"/>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>{["PO #","Supplier","Item","Qty","Status","ETA","Lead Time"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {pos.map((p,i) => (
              <tr key={i}>
                <td style={{ ...S.td, color:C.accent, fontWeight:700 }}>{p.po}</td>
                <td style={S.td}>{p.supplier}</td>
                <td style={{ ...S.td, color:C.sub }}>{p.item}</td>
                <td style={S.td}>{p.qty.toLocaleString()}</td>
                <td style={S.td}><span style={S.badge(scColor(p.status))}>{p.status}</span></td>
                <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{p.eta}</td>
                <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{p.lt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:20 }}>
        <div style={S.card}>
          <SectionHeader title="Inventory – Min/Max Thresholds"/>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>{["Item","In Stock","Allocated","Min Threshold","Status"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
            <tbody>
              {inv.map((v,i) => (
                <tr key={i}>
                  <td style={{ ...S.td, fontWeight:600 }}>{v.item}</td>
                  <td style={{ ...S.td, color:C.accent, fontWeight:700 }}>{v.stock.toLocaleString()}</td>
                  <td style={{ ...S.td, color:C.sub }}>{v.alloc.toLocaleString()}</td>
                  <td style={{ ...S.td, color:C.muted }}>{v.min.toLocaleString()}</td>
                  <td style={S.td}><span style={S.badge(invColor(v.status))}>{v.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={S.card}>
          <SectionHeader title="Supplier Scorecards"/>
          {[["Vishay India",96,C.success,"On-time"],["Mouser Electronics",91,C.success,"Reliable"],["TTI Inc",74,C.warning,"Delayed x2"],["Arrow Electronics",88,C.success,"Good"]].map(([s,sc,c,note],i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:3 }}>{s}</div>
                <ProgressBar value={sc} color={c} height={6}/>
              </div>
              <div style={{ textAlign:"right", minWidth:60 }}>
                <div style={{ fontSize:16, fontWeight:800, color:c }}>{sc}</div>
                <div style={{ fontSize:11, color:C.muted }}>{note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: AFTER-SALES
// ═══════════════════════════════════════════════════════════════════════════════
function AfterSalesModule({ user }) {
  const isAdmin = user.role === "admin";
  const [showRMAModal, setShowRMAModal] = useState(false);
  const [rmas, setRmas] = useState([
    { id:"RMA-0441", customer:"Customer A", product:"PCB-X200",       reason:"No Power",            status:"Triage",  date:"Feb 26" },
    { id:"RMA-0440", customer:"Customer B", product:"Controller-V3",  reason:"Intermittent Failure",status:"Repair",  date:"Feb 24" },
    { id:"RMA-0438", customer:"Customer C", product:"PowerModule",    reason:"Physical Damage",     status:"Closed",  date:"Feb 20" },
    { id:"RMA-0437", customer:"Customer A", product:"SensorArray-G5", reason:"Calibration Drift",   status:"Shipped", date:"Feb 18" },
  ]);
  const [rmaForm, setRmaForm] = useState({ customer:"", product:"", reason:"" });

  const addRMA = () => {
    if (!rmaForm.product) return;
    setRmas([{ id:`RMA-044${rmas.length+2}`, status:"Triage", date:"Today", ...rmaForm }, ...rmas]);
    setShowRMAModal(false); setRmaForm({ customer:"", product:"", reason:"" });
  };

  const rmaColor = s => s==="Closed"||s==="Shipped"?C.success:s==="Repair"?C.warning:C.accent;

  return (
    <div>
      <Topbar title="After-Sales Service" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        <StatCard label="Open RMAs"       value="8" sub="3 awaiting triage"  color={C.accent}    icon="wrench"/>
        <StatCard label="Warranty Claims" value="5" sub="This month"         color={C.warning}   icon="doc"/>
        <StatCard label="Spare Parts Low" value="3" sub="Below safety stock" color={C.danger}    icon="box"/>
        <StatCard label="EOL Programs"    value="2" sub="LTB active"         color={C.accentAlt} icon="alert"/>
      </div>

      <div style={{ ...S.card, marginBottom:20 }}>
        <SectionHeader title="RMA Cases" action={()=>setShowRMAModal(true)} actionLabel="New RMA"/>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>{["RMA ID","Customer","Product","Reason","Status","Date","Actions"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {rmas.map((r,i) => (
              <tr key={i}>
                <td style={{ ...S.td, color:C.accent, fontWeight:700 }}>{r.id}</td>
                <td style={S.td}>{r.customer}</td>
                <td style={{ ...S.td, color:C.sub }}>{r.product}</td>
                <td style={{ ...S.td, fontSize:12 }}>{r.reason}</td>
                <td style={S.td}><span style={S.badge(rmaColor(r.status))}>{r.status}</span></td>
                <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{r.date}</td>
                <td style={S.td}><button style={{ ...S.btn("ghost"), padding:"4px 10px", fontSize:11, background:C.border }}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20 }}>
        <div style={S.card}>
          <SectionHeader title="Warranty Overview"/>
          {[["Coverage Checks","12",C.accent],["Claims Approved","4",C.success],["Claims Rejected","1",C.danger],["Failure Rate Trend","2.1%",C.warning]].map(([l,v,c]) => (
            <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:13, color:C.sub }}>{l}</span>
              <span style={{ fontSize:16, fontWeight:800, color:c }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={S.card}>
          <SectionHeader title="Spare Parts Catalog"/>
          {[["PCB-X200 Assembly",42,C.success],["Controller Board V3",18,C.success],["Power Module Unit",5,C.warning],["Sensor Array Sub",2,C.danger]].map(([item,qty,c],i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:12, color:C.sub }}>{item}</span>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:14, fontWeight:700, color:c }}>{qty}</span>
                <span style={{ fontSize:11, color:C.muted }}>units</span>
              </div>
            </div>
          ))}
        </div>

        <div style={S.card}>
          <SectionHeader title="EOL Support"/>
          {[{ prog:"Legacy PCB Rev A", stage:"LTB Active", date:"Mar 15", stock:"450 units" },{ prog:"Controller V2", stage:"EOL Notice Sent", date:"Apr 01", stock:"120 units" }].map((e,i) => (
            <div key={i} style={{ padding:"12px 0", borderBottom:i===0?`1px solid ${C.border}`:"none" }}>
              <div style={{ fontSize:13, fontWeight:700 }}>{e.prog}</div>
              <div style={{ display:"flex", gap:8, marginTop:6, flexWrap:"wrap" }}>
                <span style={S.badge(C.warning)}>{e.stage}</span>
                <span style={{ fontSize:11, color:C.muted }}>Buy-by: {e.date}</span>
              </div>
              <div style={{ fontSize:11, color:C.sub, marginTop:4 }}>Consignment: {e.stock}</div>
            </div>
          ))}
        </div>
      </div>

      {showRMAModal && (
        <Modal title="Create New RMA" onClose={() => setShowRMAModal(false)}>
          {[["Customer Account","customer"],["Product / Part Number","product"],["Reason for Return","reason"]].map(([l,k]) => (
            <div key={k} style={{ marginBottom:14 }}>
              <label style={S.label}>{l}</label>
              <input style={S.input} value={rmaForm[k]} onChange={e=>setRmaForm({...rmaForm,[k]:e.target.value})} placeholder={`Enter ${l.toLowerCase()}`}/>
            </div>
          ))}
          <div style={{ display:"flex", gap:10, marginTop:6 }}>
            <button onClick={addRMA} style={{ ...S.btn("primary"), flex:1, justifyContent:"center" }}>Create RMA</button>
            <button onClick={()=>setShowRMAModal(false)} style={{ ...S.btn("ghost"), flex:1, justifyContent:"center", border:`1px solid ${C.border}` }}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: COLLABORATION & DOCUMENTS
// ═══════════════════════════════════════════════════════════════════════════════
function CollabModule({ user }) {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    { from:"Alex Morgan",  role:"admin",    text:"PCB-X200 NPI stage gate review on March 3rd. Please prepare FAI checklist and test evidence by EOD March 2nd.", time:"Today 9:12", project:"PCB-X200 NPI" },
    { from:"Sam Patel",    role:"employee", text:"PowerModule Rev B – Coating process qualification complete. Uploading test reports and photos now.", time:"Today 10:45", project:"PowerModule Rev B" },
    { from:"Jordan Kim",   role:"employee", text:"NCR-2041 containment action done. Root cause analysis underway using 5-Why and Fishbone diagram.", time:"Today 11:30", project:"Quality" },
    { from:"Lee Chen",     role:"employee", text:"SensorArray-G5 NPI: prototype iteration 2 complete. Qualification testing starts next week.", time:"Yesterday",   project:"SensorArray-G5" },
  ]);
  const [docs] = useState([
    { name:"PowerModule_FAI_Report_v2.pdf",  type:"FAI Report",  project:"PowerModule Rev B",  ver:"v2.0", status:"Approved",  date:"Feb 25" },
    { name:"PCB-X200_BOM_Rev3.xlsx",         type:"BOM",         project:"PCB-X200 NPI",       ver:"v3.0", status:"In Review", date:"Feb 24" },
    { name:"ISO9001_Cert_2025.pdf",          type:"Certificate", project:"Quality",            ver:"v1.0", status:"Active",    date:"Feb 20" },
    { name:"Controller-V3_SPC_Data.xlsx",    type:"SPC Data",    project:"Controller-V3",      ver:"v1.2", status:"Approved",  date:"Feb 18" },
    { name:"SensorArray_TestPlan_v1.pdf",    type:"Test Plan",   project:"SensorArray-G5",     ver:"v1.0", status:"Draft",     date:"Feb 14" },
  ]);

  const send = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { from:user.name, role:user.role, text:msg, time:"Just now", project:"General" }]);
    setMsg("");
  };

  return (
    <div>
      <Topbar title="Collaboration & Documents" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:20 }}>
        {/* Thread panel */}
        <div style={{ ...S.card, display:"flex", flexDirection:"column", height:560 }}>
          <SectionHeader title="Project Threads"/>
          <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:10, marginBottom:14, paddingRight:4 }}>
            {messages.map((m,i) => (
              <div key={i} style={{ background:C.bg, borderRadius:10, padding:"12px 14px", border:`1px solid ${C.border}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:m.role==="admin"?`${C.accentAlt}30`:`${C.accent}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:m.role==="admin"?C.accentAlt:C.accent, flexShrink:0 }}>
                    {m.from.split(" ").map(w=>w[0]).join("")}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, fontWeight:700 }}>{m.from}</div>
                    <div style={{ fontSize:10, color:C.muted }}>{m.time}</div>
                  </div>
                  <span style={{ ...S.badge(C.accent), fontSize:10 }}>{m.project}</span>
                </div>
                <div style={{ fontSize:13, color:C.sub, lineHeight:1.55 }}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <input style={{ ...S.input, flex:1 }} placeholder="Type a message…" value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
            <button onClick={send} style={{ ...S.btn("primary"), padding:"10px 16px", flexShrink:0 }}><Icon n="plus" size={16}/></button>
          </div>
        </div>

        {/* Documents */}
        <div>
          <div style={{ ...S.card, marginBottom:16 }}>
            <SectionHeader title="Document Repository" action={()=>{}} actionLabel="Upload Doc" icon="upload"/>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr>{["Document","Type","Project","Ver","Status","Date"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>
                {docs.map((d,i) => (
                  <tr key={i}>
                    <td style={{ ...S.td, fontSize:12, fontWeight:500 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <Icon n="doc" size={13} color={C.accent}/>{d.name}
                      </div>
                    </td>
                    <td style={S.td}><span style={S.badge(C.muted)}>{d.type}</span></td>
                    <td style={{ ...S.td, color:C.sub, fontSize:12 }}>{d.project}</td>
                    <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{d.ver}</td>
                    <td style={S.td}><span style={S.badge(d.status==="Approved"||d.status==="Active"?C.success:d.status==="In Review"?C.warning:C.muted)}>{d.status}</span></td>
                    <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{d.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={S.card}>
            <SectionHeader title="Knowledge Base"/>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[["Process Guides","14 articles",C.accent],["Test Procedures","8 documents",C.success],["Training Materials","22 files",C.warning],["FAQs & SLAs","Contact directory",C.sub],["Capabilities","Facilities & tools",C.accentAlt],["Drawings & Specs","3D CAD / Gerber viewer",C.muted]].map(([t,s,c]) => (
                <div key={t} style={{ background:C.bg, borderRadius:8, padding:"12px 14px", border:`1px solid ${C.border}`, cursor:"pointer" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:c }}>{t}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: ANALYTICS & REPORTING
// ═══════════════════════════════════════════════════════════════════════════════
function AnalyticsModule({ user }) {
  const isAdmin = user.role === "admin";

  return (
    <div>
      <Topbar title={isAdmin ? "Analytics & Reporting" : "My Reports"} />

      {isAdmin && (
        <div style={{ ...S.card, marginBottom:20, background:`linear-gradient(135deg,${C.card},#0a1526)`, border:`1px solid ${C.accent}30` }}>
          <div style={{ fontSize:11, color:C.accent, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>Executive Dashboard – KPIs</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:16 }}>
            {[["On-Time Delivery","94%",C.success],["Quality Yield","97.2%",C.success],["Capacity Util","76%",C.accent],["Defect Rate","1.8%",C.warning],["Service KPI","98.1%",C.success]].map(([l,v,c]) => (
              <div key={l} style={{ textAlign:"center", padding:"14px 0", background:C.bg+"80", borderRadius:10, border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:26, fontWeight:800, color:c, letterSpacing:"-0.02em" }}>{v}</div>
                <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        <div style={S.card}>
          <SectionHeader title={isAdmin?"Customer Program Dashboard":"My Program Status"}/>
          <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>Progress by program {isAdmin?"across all customers":""}</div>
          {[["PCB-X200 NPI","Customer A",45,C.warning],["Controller-V3","Customer B",72,C.success],["PowerModule Rev B","Customer A",91,C.success],["SensorArray-G5","Customer C",30,C.danger]].map(([p,c,v,col]) => (
            <div key={p} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:13, fontWeight:600 }}>{p}</span>
                <span style={{ fontSize:11, color:C.muted }}>{c}</span>
              </div>
              <ProgressBar value={v} color={col} height={8}/>
              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:3 }}>
                <span style={{ fontSize:11, color:col, fontWeight:700 }}>{v}%</span>
              </div>
            </div>
          ))}
        </div>

        <div style={S.card}>
          <SectionHeader title="Predictive Insights"/>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
            {[
              ["Line 3 capacity at 95% — constraint risk in 3 days", C.danger],
              ["IC LM741 stock projected to deplete in 5 days", C.warning],
              ["FDA cert expiry in 14 days — renewal action needed", C.warning],
              ["SensorArray-G5 qualification at risk — schedule review", C.accent],
            ].map(([ins,c],i) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"10px 12px", background:`${c}10`, borderRadius:8, border:`1px solid ${c}30` }}>
                <Icon n="alert" size={14} color={c}/>
                <span style={{ fontSize:12, color:C.sub, lineHeight:1.5 }}>{ins}</span>
              </div>
            ))}
          </div>

          <SectionHeader title="Quality Risk Indicators"/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[["Escaped Defect Risk","Medium",C.warning],["Supply Disruption","Low",C.success],["Delivery Risk","Low",C.success],["Capacity Risk","High",C.danger]].map(([l,v,c]) => (
              <div key={l} style={{ background:C.bg, borderRadius:8, padding:"10px 12px", border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", letterSpacing:"0.05em" }}>{l}</div>
                <div style={{ fontSize:14, fontWeight:800, color:c, marginTop:4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={S.card}>
        <SectionHeader title="Self-Serve Reports & Exports"/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {[
            ["Quality Summary – Feb 2025","PDF",C.danger],
            ["Production KPIs – Week 8","Excel",C.success],
            ["NCR Closure Rate – Q1","CSV",C.accent],
            ["Supplier Scorecard – Q4","PDF",C.warning],
            ["Compliance Bundle","PDF+ZIP",C.accentAlt],
            ["Shipment Exception Report","Excel",C.sub],
            ["Yield Trends – 90 days","CSV",C.success],
            ["Audit Evidence Pack","ZIP",C.accent],
          ].map(([name,type,c]) => (
            <div key={name} style={{ background:C.bg, borderRadius:9, padding:"12px 14px", border:`1px solid ${C.border}`, display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <Icon n="doc" size={16} color={c}/>
                <span style={{ fontSize:12, fontWeight:600, flex:1 }}>{name}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={S.badge(c)}>{type}</span>
                <button style={{ ...S.btn("ghost"), padding:"4px 10px", fontSize:11, background:C.border }}><Icon n="download" size={11}/>Export</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: INTEGRATIONS (Admin only)
// ═══════════════════════════════════════════════════════════════════════════════
function IntegrationsModule() {
  const systems = [
    { name:"ERP System",          type:"ERP",           desc:"Orders, POs, invoices (summary), customer master, item masters",                 status:"Connected", icon:"box",          lastSync:"2 min ago" },
    { name:"MES / Shop-Floor",    type:"MES",           desc:"Work order progress, machine/test results, yields, timestamps",                  status:"Connected", icon:"production",   lastSync:"5 min ago" },
    { name:"PLM / Engineering",   type:"PLM",           desc:"BOMs, ECO/ECR, drawings/specs, revisions",                                       status:"Connected", icon:"doc",          lastSync:"10 min ago" },
    { name:"QMS / Lab Systems",   type:"QMS",           desc:"NCR/CAPA, audits, certification/test artifacts",                                 status:"Connected", icon:"quality",      lastSync:"8 min ago" },
    { name:"WMS / Logistics",     type:"WMS",           desc:"Inventory, movements, shipments, tracking events",                               status:"Syncing",   icon:"supply",       lastSync:"Syncing…" },
    { name:"Customer CRM/Portal", type:"CRM",           desc:"Customer forecast upload, MRP outputs, capacity commitments, forecast accuracy", status:"Connected", icon:"users",        lastSync:"15 min ago" },
  ];

  return (
    <div>
      <Topbar title="Integrations & Data Sources"/>
      <div style={{ ...S.card, marginBottom:24, background:`${C.accent}07`, border:`1px solid ${C.accent}30` }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:44, height:44, background:`${C.accent}18`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Icon n="integrations" size={22} color={C.accent}/>
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>FactoryIQ Integration Layer</div>
            <div style={{ fontSize:13, color:C.sub }}>All data is federated in real-time via secure API connectors. FactoryIQ provides a single pane of glass across your ERP, MES, PLM, QMS, and WMS systems — no manual data entry required.</div>
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        {systems.map((s,i) => (
          <div key={i} style={{ ...S.card, display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ width:46, height:46, background:`${C.accent}15`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon n={s.icon} size={22} color={C.accent}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
                <div style={{ fontSize:14, fontWeight:700 }}>{s.name}</div>
                <span style={S.badge(s.status==="Connected"?C.success:C.warning)}>{s.status}</span>
              </div>
              <span style={{ ...S.badge(C.accent), fontSize:10, marginBottom:8, display:"inline-block" }}>{s.type}</span>
              <div style={{ fontSize:12, color:C.muted, marginTop:4 }}>{s.desc}</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:8 }}>Last sync: {s.lastSync}</div>
            </div>
          </div>
        ))}
        {/* Add new */}
        <div style={{ ...S.card, border:`2px dashed ${C.border}`, background:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8, cursor:"pointer", minHeight:110 }}>
          <Icon n="plus" size={26} color={C.muted}/>
          <span style={{ fontSize:13, color:C.muted }}>Add New Integration</span>
        </div>
      </div>

      {/* Core data objects */}
      <div style={S.card}>
        <SectionHeader title="Core Data Objects (Portal Vocabulary)"/>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            ["Operational","Program, Project, Site/Facility, Customer Account, Work Order, Operation/Station, Milestone, Forecast"],
            ["Quality & Compliance","NCR, CAPA/8D, Audit, BOM, Document/Artifact, Revision, ECO/ECR, Test Plan/Result, Certification/Compliance Package"],
            ["Supply Chain","Supplier, PO, Shipment, Inventory Item/Lot"],
            ["After-Sales","RMA, Repair Case, Warranty Claim, Spare Part Order, EOL Notice"],
          ].map(([cat,items]) => (
            <div key={cat} style={{ background:C.bg, borderRadius:8, padding:"14px 16px", border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:11, fontWeight:800, color:C.accent, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{cat}</div>
              <div style={{ fontSize:12, color:C.sub, lineHeight:1.7 }}>{items}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: USER MANAGEMENT (Admin only)
// ═══════════════════════════════════════════════════════════════════════════════
function UsersModule() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([
    { name:"Alex Morgan",   email:"alex@nexgile.com",    role:"admin",    dept:"Manufacturing",  site:"Hyderabad", status:"Active",   last:"Today" },
    { name:"Jordan Kim",    email:"jordan@nexgile.com",  role:"employee", dept:"Quality Eng.",   site:"Hyderabad", status:"Active",   last:"Today" },
    { name:"Sam Patel",     email:"sam@nexgile.com",     role:"employee", dept:"Production",     site:"Pune",      status:"Active",   last:"Yesterday" },
    { name:"Lee Chen",      email:"lee@nexgile.com",     role:"employee", dept:"R&D",            site:"Chennai",   status:"Active",   last:"Feb 25" },
    { name:"Maria Santos",  email:"maria@nexgile.com",   role:"employee", dept:"Supply Chain",   site:"Hyderabad", status:"Inactive", last:"Feb 10" },
    { name:"Ravi Sharma",   email:"ravi@nexgile.com",    role:"employee", dept:"Logistics",      site:"Pune",      status:"Active",   last:"Feb 26" },
  ]);
  const [form, setForm] = useState({ name:"", email:"", role:"employee", dept:"", site:"Hyderabad" });

  const addUser = () => {
    if (!form.name || !form.email) return;
    setUsers([...users, { ...form, status:"Active", last:"Today" }]);
    setShowModal(false); setForm({ name:"", email:"", role:"employee", dept:"", site:"Hyderabad" });
  };
  const revoke = (i) => setUsers(users.map((u,idx) => idx===i?{...u,status:"Inactive"}:u));

  return (
    <div>
      <Topbar title="User Management"/>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        <StatCard label="Total Users"   value={users.length} sub="Across all sites"  color={C.accent}    icon="users"/>
        <StatCard label="Admin Users"   value={users.filter(u=>u.role==="admin").length} sub="Full portal access" color={C.accentAlt} icon="settings"/>
        <StatCard label="Active Users"  value={users.filter(u=>u.status==="Active").length} sub="Currently active" color={C.success}   icon="check"/>
        <StatCard label="Sites"         value="3"            sub="HYD · CHE · PUN"   color={C.warning}   icon="production"/>
      </div>

      <div style={S.card}>
        <SectionHeader title="All Users" action={() => setShowModal(true)} actionLabel="Invite User"/>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>{["User","Email","Role","Department","Site","Status","Last Active","Actions"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {users.map((u,i) => (
              <tr key={i}>
                <td style={{ ...S.td, fontWeight:700 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:30, height:30, borderRadius:"50%", background:u.role==="admin"?`${C.accentAlt}30`:`${C.accent}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:u.role==="admin"?C.accentAlt:C.accent }}>
                      {u.name.split(" ").map(w=>w[0]).join("")}
                    </div>
                    {u.name}
                  </div>
                </td>
                <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{u.email}</td>
                <td style={S.td}><span style={S.badge(u.role==="admin"?C.accentAlt:C.accent)}>{u.role}</span></td>
                <td style={{ ...S.td, color:C.sub }}>{u.dept}</td>
                <td style={{ ...S.td, color:C.sub }}>{u.site}</td>
                <td style={S.td}><span style={S.badge(u.status==="Active"?C.success:C.muted)}>{u.status}</span></td>
                <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{u.last}</td>
                <td style={{ ...S.td }}>
                  <div style={{ display:"flex", gap:6 }}>
                    <button style={{ ...S.btn("ghost"), padding:"4px 10px", fontSize:11, background:C.border }}>Edit</button>
                    {u.status==="Active" && <button onClick={()=>revoke(i)} style={{ ...S.btn("danger"), padding:"4px 10px", fontSize:11 }}>Revoke</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="Invite New User" onClose={()=>setShowModal(false)}>
          {[["Full Name","name","text"],["Email Address","email","email"],["Department","dept","text"]].map(([l,k,t]) => (
            <div key={k} style={{ marginBottom:14 }}>
              <label style={S.label}>{l}</label>
              <input type={t} style={S.input} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={`Enter ${l.toLowerCase()}`}/>
            </div>
          ))}
          <div style={{ marginBottom:14 }}>
            <label style={S.label}>Role</label>
            <select style={S.input} value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={S.label}>Site</label>
            <select style={S.input} value={form.site} onChange={e=>setForm({...form,site:e.target.value})}>
              {["Hyderabad","Chennai","Pune"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={addUser} style={{ ...S.btn("primary"), flex:1, justifyContent:"center" }}>Send Invite</button>
            <button onClick={()=>setShowModal(false)} style={{ ...S.btn("ghost"), flex:1, justifyContent:"center", border:`1px solid ${C.border}` }}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE: SETTINGS (Admin only)
// ═══════════════════════════════════════════════════════════════════════════════
function SettingsModule() {
  const sections = [
    { title:"General Settings", items:[["Portal Name","Nexgile FactoryIQ"],["Default Site","Hyderabad"],["Date Format","DD/MM/YYYY"],["Timezone","IST (UTC+5:30)"],["Language","English (IN)"]] },
    { title:"Notification Settings", items:[["NCR Alerts","Email + In-app"],["Cert Expiry Warning","30 days before"],["Shipment Exceptions","Real-time"],["ECO Change Alerts","Daily digest"],["Production Alerts","In-app only"]] },
    { title:"Access Control", items:[["Customer Segregation","Enabled"],["Role-Based Views","Enabled"],["Audit Logging","Full (360 days)"],["Session Timeout","8 hours"],["MFA","Optional"]] },
    { title:"Export & Reporting", items:[["Default Format","PDF + Excel"],["Scheduled Exports","Weekly – Monday"],["Compliance Bundle","On-demand"],["Report Sharing","Enabled"],["Data Retention","5 years"]] },
  ];

  return (
    <div>
      <Topbar title="Portal Settings"/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {sections.map((sec) => (
          <div key={sec.title} style={S.card}>
            <h3 style={{ margin:"0 0 16px", fontSize:15, fontWeight:700 }}>{sec.title}</h3>
            {sec.items.map(([label,val],i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:13, color:C.sub }}>{label}</span>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:13, color:C.accent, fontWeight:600 }}>{val}</span>
                  <button style={{ ...S.btn("ghost"), padding:"3px 8px", fontSize:11, background:C.border }}><Icon n="edit" size={11}/></button>
                </div>
              </div>
            ))}
            <button style={{ ...S.btn("primary"), marginTop:16, fontSize:12, padding:"8px 16px" }}>Save Changes</button>
          </div>
        ))}
      </div>

      {/* Key Functional Requirements box */}
      <div style={{ ...S.card, marginTop:20, border:`1px solid ${C.accent}30` }}>
        <SectionHeader title="Key Functional Requirements – System Compliance"/>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {[
            ["Role-based access & customer segregation","Users see only their programs/projects/sites and permitted artifacts",C.success],
            ["Real-time + audit history","Current status plus auditable history for milestones, changes, quality events, and shipments",C.success],
            ["Global search & navigation","Search across projects, documents, issues, and parts with filters and saved views",C.success],
            ["Event-driven notifications","Alerts for delays, quality issues, cert expiry, shipment exceptions, and ECO changes",C.success],
            ["Bulk download packages","Audit/compliance bundles, project evidence packs, and release-ready document sets",C.success],
            ["Predictive insights","Delivery risk flags, quality risk indicators, supply disruption alerts based on trends",C.warning],
          ].map(([title,desc,c]) => (
            <div key={title} style={{ display:"flex", gap:12, padding:"12px 14px", background:C.bg, borderRadius:9, border:`1px solid ${C.border}` }}>
              <Icon n="check" size={16} color={c}/>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:3 }}>{title}</div>
                <div style={{ fontSize:12, color:C.muted, lineHeight:1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACCESS DENIED
// ═══════════════════════════════════════════════════════════════════════════════
function AccessDenied() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"70vh", flexDirection:"column", gap:16 }}>
      <div style={{ width:70, height:70, background:`${C.danger}15`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Icon n="alert" size={32} color={C.danger}/>
      </div>
      <h2 style={{ color:C.danger, margin:0, fontSize:20, fontWeight:800 }}>Access Restricted</h2>
      <p style={{ color:C.muted, margin:0, fontSize:14, textAlign:"center", maxWidth:340 }}>This section requires Administrator privileges. Contact your system administrator to request access.</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
const MODULES = {
  dashboard:    DashboardModule,
  programs:     ProgramsModule,
  production:   ProductionModule,
  quality:      QualityModule,
  supply:       SupplyModule,
  afterSales:   AfterSalesModule,
  collab:       CollabModule,
  analytics:    AnalyticsModule,
  integrations: IntegrationsModule,
  users:        UsersModule,
  settings:     SettingsModule,
};
const ADMIN_ONLY = ["integrations","users","settings"];

export default function App() {
  const [user, setUser]     = useState(null);
  const [active, setActive] = useState("dashboard");

  if (!user) return <LoginPage onLogin={setUser}/>;

  const Module = MODULES[active] || DashboardModule;
  const denied = ADMIN_ONLY.includes(active) && user.role !== "admin";

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <Sidebar user={user} active={active} setActive={setActive} onLogout={() => { setUser(null); setActive("dashboard"); }}/>
      <main style={{ marginLeft:248, padding:"28px 32px", minHeight:"100vh" }}>
        {denied ? <AccessDenied/> : <Module user={user}/>}
      </main>
    </div>
  );
}
