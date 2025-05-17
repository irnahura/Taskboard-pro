import useProjectStore from "../store/useProjectStore";
import { Button, Input, message } from "antd";
import { useState } from "react";
import KanbanBoard from "../components/kanban/KanbanBoard";
import { supabase } from "../lib/supabaseClient";
import { useProjects } from "../hooks/useProjects";
import { queryClient } from "../lib/reactQueryClient";

const Dashboard = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { data: projects, isLoading, error } = useProjects();
  const [projectName, setProjectName] = useState("");

  const handleAddProject = async () => {
    if (!projectName.trim()) {
      messageApi.open({
        type: "warning",
        content: "The project name cannot be empty.",
      });
      return;
    }

    const { error } = await supabase
      .from("projects")
      .insert([{ name: projectName }]);

    if (error) {
      messageApi.open({
        type: "error",
        content: "Error adding the project.",
      });
      console.error(error);
    } else {
      messageApi.open({
        type: "success",
        content: "Project added successfully.",
      });
      setProjectName("");
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Refresh the list of projects
    }
  };

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p>Error loading projects: {error.message}</p>;

  return (
    <div className="p-6">
      {contextHolder}
      <h1 className="text-2xl font-bold">Your Projects</h1>
      <Input
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Project Name"
        onPressEnter={handleAddProject}
      />
      <Button onClick={handleAddProject}>Add Project</Button>

      {projects?.map((project) => (
        <div key={project.id} className="mt-4">
          <h2 className="text-xl font-bold">{project.name}</h2>
          <KanbanBoard projectId={project.id} tasks={project.tasks || []} />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
