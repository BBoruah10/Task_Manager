import API from "../../api/axios";

const TaskCard = ({ task, refresh }) => {
  const updateStatus = async (status) => {
    await API.put(`/tasks/${task.id}?status=${status}`);
    refresh();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>

      <p className="mt-2 text-sm">
        Status: <span className="font-bold">{task.status}</span>
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => updateStatus("IN_PROGRESS")}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          In Progress
        </button>

        <button
          onClick={() => updateStatus("DONE")}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TaskCard;