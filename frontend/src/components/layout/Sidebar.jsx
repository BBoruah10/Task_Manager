import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">
        Task Manager
      </h2>

      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/tasks" className="block hover:text-blue-600">
          Tasks
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;