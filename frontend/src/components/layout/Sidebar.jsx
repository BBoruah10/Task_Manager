import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all";

  const activeStyle =
    "bg-blue-600 text-white shadow-md";

  const inactiveStyle =
    "text-gray-600 hover:bg-gray-100";

  return (
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col justify-between">
      
      {/* Top Section */}
      <div>
        <div className="px-6 py-6 border-b">
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
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;