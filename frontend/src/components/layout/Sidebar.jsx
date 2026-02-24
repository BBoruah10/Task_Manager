import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, ClipboardList, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);

  const baseStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300";

  const activeStyle =
    "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg";

  const inactiveStyle =
    "hover:bg-blue-100 dark:hover:bg-slate-700";

  return (
    <div
      className="
        h-screen w-64 flex flex-col justify-between
        bg-gradient-to-b from-white via-blue-50 to-indigo-50
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        text-gray-800 dark:text-gray-100
        border-r border-gray-200 dark:border-gray-800
        shadow-xl
        transition-colors duration-300
      "
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TaskManager
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-8 space-y-3 px-4">

          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          {/* Tasks */}
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <CheckSquare size={20} />
            <span>Tasks</span>
          </NavLink>

          {/* 👑 Assigned Tasks (LEADER ONLY) */}
          {user?.role === "LEADER" && (
            <NavLink
              to="/assigned-tasks"
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              <ClipboardList size={20} />
              <span>Assigned Tasks</span>
            </NavLink>
          )}

        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={logout}
          className="
            flex items-center gap-3 w-full px-4 py-3 rounded-xl
            font-medium
            text-red-600 dark:text-red-400
            hover:bg-red-100 dark:hover:bg-red-900/30
            transition-all duration-300
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;