import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/layout/Layout";
import TaskCard from "../components/tasks/TaskCard";
import CreateTaskModal from "../components/tasks/CreateTaskModal";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Create Task
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} refresh={fetchTasks} />
        ))}
      </div>

      {showModal && (
        <CreateTaskModal
          close={() => setShowModal(false)}
          refresh={fetchTasks}
        />
      )}
    </Layout>
  );
};

export default Tasks;