import { Bell, Search, ChevronDown, Moon, Sun, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = ({ setSearchTerm, notifications }) => {
  const { logout, user } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const initial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <div
      className="
        bg-white text-gray-900
        dark:bg-gray-900 dark:text-gray-100
        border-b border-gray-200 dark:border-gray-800
        px-8 py-4 flex items-center justify-between
        shadow-sm transition-colors duration-300
      "
    >

      {/* LEFT SIDE */}
      <h2 className="text-lg font-semibold">
        Dashboard
      </h2>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* SEARCH */}
        <div
          className="
            flex items-center 
            bg-gray-100 dark:bg-gray-800
            px-3 py-2 rounded-lg w-64
            transition-colors duration-300
          "
        >
          <Search size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="
              bg-transparent outline-none text-sm w-full
              text-gray-900 dark:text-gray-100
            "
            onChange={(e) => setSearchTerm?.(e.target.value)}
          />
        </div>

        {/* NOTIFICATIONS */}
        <div className="relative cursor-pointer">
          <Bell size={22} className="text-gray-600 dark:text-gray-300" />
          {notifications > 0 && (
            <span
              className="
                absolute -top-1 -right-1 
                bg-red-500 text-white text-xs 
                px-1.5 rounded-full
              "
            >
              {notifications}
            </span>
          )}
        </div>

        {/* DARK MODE TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
            p-2 rounded-lg 
            hover:bg-gray-200 dark:hover:bg-gray-700 
            transition-colors duration-300
          "
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-700" />
          )}
        </button>

        {/* PROFILE */}
        <div className="relative">

          {/* Avatar */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="
                h-9 w-9 rounded-full 
                bg-blue-600 
                flex items-center justify-center 
                text-white font-bold
              "
            >
              {initial}
            </div>
            <ChevronDown size={16} className="dark:text-gray-300" />
          </div>

          {/* Dropdown */}
          {open && (
            <div
              className="
                absolute right-0 mt-3 w-64
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                shadow-xl rounded-xl p-4
                transition-colors duration-300
              "
            >
              {/* User Info */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
                <p className="font-semibold">
                  {user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.sub || user?.email}
                </p>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="
                  flex items-center gap-2 w-full px-3 py-2 
                  text-red-600 hover:bg-red-50 
                  dark:hover:bg-red-900/30 
                  rounded-lg transition-colors
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;