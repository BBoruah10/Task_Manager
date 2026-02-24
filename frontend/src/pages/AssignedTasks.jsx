import { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import API from "../api/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const AssignedTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignedTasks = async () => {
    try {
      setLoading(true);

      // 🔥 Backend endpoint
      const res = await API.get("leader/tasks/assigned");

      setTasks(res.data || []);
    } catch (err) {
      toast.error("Failed to load assigned tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "LEADER") {
      fetchAssignedTasks();
    }
  }, [user]);

  if (!user || user.role !== "LEADER") return null;

  return (
    <Layout>
      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-blue-50 via-indigo-50 to-white
          dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
          p-10 transition-colors duration-300
        "
      >
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Assigned Tasks
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Tasks you have assigned to members
          </p>
        </div>

        {/* Task List */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No assigned tasks yet.</p>
        ) : (
          <div className="space-y-8">

            {tasks.map((task) => {

              const statusColor =
                task.status === "DONE"
                  ? "bg-green-500"
                  : task.status === "IN_PROGRESS"
                  ? "bg-amber-500"
                  : "bg-red-500";

              const borderColor =
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
                    bg-white dark:bg-slate-800
                    rounded-3xl px-10 py-7
                    shadow-xl hover:shadow-2xl
                    hover:-translate-y-1
                    transition-all duration-300
                    border-l-8 ${borderColor}
                    border border-gray-100 dark:border-slate-700
                  `}
                >

                  {/* LEFT SIDE */}
                  <div className="flex flex-col max-w-xl">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {task.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">
                      {task.description}
                    </p>

                    <p className="text-xs text-indigo-500 mt-3">
                      Assigned To: {task.assignedEmail}
                    </p>
                  </div>

                  {/* RIGHT SIDE */}
                  <div>
                    <span
                      className={`
                        ${statusColor}
                        text-white text-sm font-medium
                        px-5 py-2 rounded-full
                        shadow-md
                      `}
                    >
                      {task.status}
                    </span>
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

export default AssignedTasks;