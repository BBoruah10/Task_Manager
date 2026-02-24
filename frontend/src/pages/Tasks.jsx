import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Trash2, Plus } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks"); // keep your working endpoint
      setTasks(res.data || []);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}?status=${status}`);
      toast.success("Status updated");
      fetchTasks();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const filteredTasks =
    filter === "ALL"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  if (!user) return null;

  return (
    <Layout>
      <div className="min-h-screen
        bg-gradient-to-br
        from-blue-50 via-indigo-50 to-white
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        p-10 transition-colors duration-300"
     >

        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-12">

          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight dark:text-white">
            Tasks
          </h1>

          <div className="flex items-center gap-4">

            {/* FILTER */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-5 py-2 rounded-xl border bg-white shadow-md focus:ring-2 focus:ring-indigo-400 transition dark:text-black"
            >
              <option value="ALL">All</option>
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Completed</option>
            </select>

            {/* CREATE BUTTON (LEADER ONLY) */}
            {user.role === "LEADER" && (
              <Link
                to="/create-task"
                className="flex items-center gap-2 
                           bg-gradient-to-r from-blue-500 to-indigo-600 
                           hover:from-blue-600 hover:to-indigo-700 
                           text-white px-6 py-2 rounded-xl shadow-lg 
                           transition-all duration-300"
              >
                <Plus size={16} />
                Create Task
              </Link>
            )}

          </div>
        </div>

        {/* ===== TASK LIST ===== */}
        {loading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          <div className="space-y-8">

            {filteredTasks.map((task) => {

              const statusColor =
                task.status === "DONE"
                  ? "bg-green-500"
                  : task.status === "IN_PROGRESS"
                  ? "bg-amber-500"
                  : "bg-red-500";

              const leftBorderColor =
                task.status === "DONE"
                  ? "border-green-500"
                  : task.status === "IN_PROGRESS"
                  ? "border-amber-500"
                  : "border-red-500";

              return (
                <div
                  key={task.id}
                  className={`
                    flex justify-between items-center
                    bg-white rounded-3xl px-10 py-7
                    shadow-xl hover:shadow-2xl
                    hover:-translate-y-1
                    transition-all duration-300
                    border-l-8 ${leftBorderColor}
                  `}
                >

                  {/* LEFT SIDE */}
                  <div className="flex flex-col max-w-xl">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                      {task.description}
                    </p>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center gap-6">

                    {/* COLORED DROPDOWN ONLY */}
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateStatus(task.id, e.target.value)
                      }
                      className={`
                        ${statusColor}
                        text-white font-medium
                        px-5 py-2
                        rounded-full shadow-md
                        focus:outline-none cursor-pointer
                        transition
                      `}
                    >
                      <option value="TODO" className="text-black">
                        TODO
                      </option>
                      <option value="IN_PROGRESS" className="text-black">
                        IN PROGRESS
                      </option>
                      <option value="DONE" className="text-black">
                        DONE
                      </option>
                    </select>

                    {/* DELETE (LEADER ONLY) */}
                    {user.role === "LEADER" && (
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Tasks;