import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import API from "../api/axios";
import toast from "react-hot-toast";
import { PlusCircle } from "lucide-react";

const CreateTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
    assignedEmail: "",   // ✅ still required
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.assignedEmail.trim()) {
      toast.error("Assigned email is required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/tasks", formData);

      toast.success("Task created successfully 🚀");
      navigate("/tasks");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto dark:text-white">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Create New Task
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Assign task to a user by email
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="w-full px-4 py-3 rounded-lg border 
                           dark:bg-gray-900 dark:border-gray-700 
                           focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the task..."
                className="w-full px-4 py-3 rounded-lg border 
                           dark:bg-gray-900 dark:border-gray-700 
                           focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border 
                           dark:bg-gray-900 dark:border-gray-700 
                           focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>

            {/* Assigned Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Assign To (Email)
              </label>
              <input
                type="email"
                name="assignedEmail"
                value={formData.assignedEmail}
                onChange={handleChange}
                placeholder="Enter user email"
                className="w-full px-4 py-3 rounded-lg border 
                           dark:bg-gray-900 dark:border-gray-700 
                           focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">

              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="w-full py-3 rounded-lg border 
                           dark:border-gray-600 hover:bg-gray-100 
                           dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 
                           bg-gradient-to-r from-blue-500 to-indigo-600 
                           hover:from-blue-600 hover:to-indigo-700 
                           text-white py-3 rounded-lg font-medium 
                           shadow-lg transition-all duration-300 
                           disabled:opacity-60"
              >
                <PlusCircle size={18} />
                {loading ? "Creating..." : "Create Task"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </Layout>
  );
};

export default CreateTask;