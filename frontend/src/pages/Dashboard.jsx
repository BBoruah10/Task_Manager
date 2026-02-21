import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/layout/Layout";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
      <div className="dark:text-white">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage and track your tasks efficiently
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full md:w-96 px-4 py-2 rounded-lg border 
                       dark:bg-gray-800 dark:border-gray-700 
                       dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Tasks
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-gray-500">No tasks found.</p>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center border-b pb-3 
                             dark:border-gray-700"
                >
                  <div>
                    <h3 className="font-medium">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {task.description}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
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



// 🔥 Attractive Gradient StatCard
const StatCard = ({ title, value, gradient }) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-6 text-white
        bg-gradient-to-r ${gradient}
        shadow-xl hover:scale-105 transition-all duration-300
      `}
    >
      {/* Background Number */}
      <div className="absolute right-4 top-4 opacity-20 text-6xl font-bold">
        {value}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-sm uppercase tracking-wide opacity-80">
          {title}
        </p>
        <h3 className="text-3xl font-bold mt-2">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default Dashboard;