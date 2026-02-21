import { useState } from "react";
import API from "../../api/axios";

const CreateTaskModal = ({ close, refresh }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedEmail: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Title"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="Description"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            placeholder="Assign to (email)"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, assignedEmail: e.target.value })
            }
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>

            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;