import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Layout from "../components/layout/Layout";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);   //  get logged-in user
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      // backend endpoint
      const res = await API.get("/tasks");

      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (user) {
    fetchTasks();
  }
}, [user]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "DONE").length;
  const inProgress = tasks.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;
  const todo = tasks.filter((t) => t.status === "TODO").length;

  return (
    <Layout>
      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-blue-50 via-indigo-50 to-white
          dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
          transition-colors duration-300
          p-6
        "
      >
        {/* 🔥 Welcome Section Added */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight dark:text-white">
            Welcome, {user?.name} 👋
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Role:{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                user?.role === "LEADER"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-white"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white"
              }`}
            >
              {user?.role}
            </span>
          </p>

          {user?.role === "LEADER" && (
            <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
              You can create and assign tasks to members.
            </p>
          )}
          {user?.role === "LEADER" && (
          <div className="mt-4">
            <button
              onClick={() => window.location.href = "/create-task"}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
            >
              + Create New Task
            </button>
  </div>
)}
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search tasks..."
            className="
              w-full md:w-96 px-4 py-3 rounded-xl border
              bg-white dark:bg-gray-800
              dark:border-gray-700
              dark:text-white
              shadow-sm
              focus:ring-2 focus:ring-indigo-500
              focus:border-indigo-500
              outline-none transition-all duration-300
            "
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total"
            value={total}
            gradient="from-blue-500 to-indigo-600"
          />
          <StatCard
            title="Todo"
            value={todo}
            gradient="from-yellow-400 to-orange-500"
          />
          <StatCard
            title="In Progress"
            value={inProgress}
            gradient="from-purple-500 to-pink-500"
          />
          <StatCard
            title="Completed"
            value={done}
            gradient="from-green-500 to-emerald-600"
          />
        </div>

        {/* Tasks Section */}
        <div
          className="
            bg-white dark:bg-gray-800
            rounded-3xl shadow-xl
            p-8
            border border-gray-100 dark:border-gray-700
            transition-all duration-300
          "
        >
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            My Tasks
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-gray-500">No tasks found.</p>
          ) : (
            <div className="space-y-5">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="
                    flex justify-between items-center
                    border-b pb-4
                    dark:border-gray-700
                  "
                >
                  <div>
                    <h3 className="font-semibold text-lg dark:text-white">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {task.description}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full ${
                      task.status === "DONE"
                        ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                        : task.status === "IN_PROGRESS"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-white"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-white"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};


// 🔥 Animated Premium StatCard
const StatCard = ({ title, value, gradient }) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-6 text-white
        bg-gradient-to-r ${gradient}
        shadow-2xl
        hover:-translate-y-1 hover:shadow-3xl
        transition-all duration-300
      `}
    >
      <div className="absolute right-4 top-4 opacity-10 text-7xl font-extrabold">
        {value}
      </div>

      <div className="relative z-10">
        <p className="text-sm uppercase tracking-wide opacity-80">
          {title}
        </p>
        <h3 className="text-4xl font-extrabold mt-2">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default Dashboard;