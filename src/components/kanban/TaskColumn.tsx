import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { useRef } from "react";

interface TaskColumnProps {
  status: "pending" | "in-progress" | "completed";
  projectId: string;
  tasks: any[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, projectId, tasks }) => {
  const internalRef = useRef<HTMLDivElement>(null);
  // 📌 Configure React DnD to allow dropping tasks in this column
  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: () => ({ status }), // 📌 Define which status the task will move to
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  dropRef(internalRef);
  return (
    <div
        ref={internalRef} // 📌 Make the column accept drops
      className={`w-1/3 p-2 border rounded-md transition-all ${
        isOver ? "bg-gray-300" : "bg-gray-100"
      }`}
    >
      <h2 className="text-lg font-bold text-center capitalize">{status}</h2>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCard key={task.id} task={task} projectId={projectId} />
        ))}
    </div>
  );
};

export default TaskColumn;
