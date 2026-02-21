import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Trash2, Plus } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
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

  return (
    <Layout>
      <div className="dark:text-white">

        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Tasks
          </h1>

          <div className="flex items-center gap-4">

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border 
                         dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="ALL">All</option>
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Completed</option>
            </select>

            {/* Create Button */}
            <Link
              to="/create-task"
              className="flex items-center gap-2 
                         bg-gradient-to-r from-blue-500 to-indigo-600 
                         hover:from-blue-600 hover:to-indigo-700 
                         text-white px-4 py-2 rounded-lg shadow-md 
                         transition-all duration-300"
            >
              <Plus size={16} />
              Create Task
            </Link>

          </div>
        </div>

        {/* ===== TASK LIST ===== */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

          {loading ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-gray-500">No tasks found.</p>
          ) : (
            <div className="space-y-5">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center 
                             border-b pb-4 dark:border-gray-700"
                >
                  {/* Task Info */}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {task.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">

                    {/* Status Dropdown */}
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateStatus(task.id, e.target.value)
                      }
                      className="px-3 py-1 rounded-lg text-sm border
                                 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">
                        IN PROGRESS
                      </option>
                      <option value="DONE">DONE</option>
                    </select>

                    {/* Delete */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </Layout>
  );
};

export default Tasks;