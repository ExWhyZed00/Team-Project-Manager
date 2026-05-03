import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview",  icon: "◈" },
  { to: "/projects",  label: "Projects",  icon: "⊟" },
  { to: "/tasks",     label: "My Tasks",  icon: "◎" },
];

export default function Sidebar({ className }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <aside className={`sidebar ${className || ""}`}>
      <div className="sidebar__logo">
        <div className="sidebar__logo-dot" />
        <span className="sidebar__logo-text">Workly</span>
      </div>

      <nav className="sidebar__nav">
        <span className="sidebar__section-label">Navigation</span>
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavLink
            key={to} to={to}
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
          >
            <span className="sidebar__link-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <span
          className="sidebar__avatar"
          style={{ background: user?.avatar_color || "#e8613c" }}
        >
          {initials}
        </span>
        <div className="sidebar__user-info">
          <span className="sidebar__user-name">{user?.name}</span>
          <span className="sidebar__user-role">Member</span>
        </div>
        <button className="sidebar__logout" onClick={handleLogout}>Exit</button>
      </div>
    </aside>
  );
}