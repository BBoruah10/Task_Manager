import { Bell, Search, ChevronDown } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ setSearchTerm, notifications }) => {
  const { logout, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const initial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="bg-white border-b px-8 py-4 flex items-center justify-between shadow-sm">

      {/* Left */}
      <h2 className="text-lg font-semibold text-gray-700">
        Dashboard
      </h2>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-64">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="bg-transparent outline-none text-sm w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <Bell size={22} className="text-gray-600" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {initial}
            </div>
            <ChevronDown size={16} />
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg py-2 border">
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
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