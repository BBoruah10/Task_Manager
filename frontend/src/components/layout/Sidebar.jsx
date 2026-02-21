import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";

  const activeStyle =
    "bg-blue-600 text-white shadow-md";

  const inactiveStyle =
    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";

  return (
    <div
      className="
        h-screen w-64 flex flex-col justify-between
        bg-white text-gray-900
        dark:bg-gray-900 dark:text-gray-100
        border-r border-gray-200 dark:border-gray-800
        shadow-sm transition-colors duration-300
      "
    >
      {/* Top Section */}
      <div>
        <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-blue-600">
            TaskManager
          </h1>
        </div>

        <nav className="mt-6 space-y-2 px-4">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <CheckSquare size={20} />
            <span>Tasks</span>
          </NavLink>

        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={logout}
          className="
            flex items-center gap-3 w-full px-4 py-3 rounded-lg
            text-red-600 dark:text-red-400
            hover:bg-red-50 dark:hover:bg-red-900/30
            transition-all duration-200
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