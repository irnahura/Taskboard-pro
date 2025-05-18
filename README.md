# 📝 TaskBoard Pro

TaskBoard Pro is a Kanban-style task management web application with drag-and-drop support, global state, and Supabase persistence.

## 🚀 Technologies Used
- 🎨 **Frontend**: React, Vite, TypeScript, Tailwind CSS, Ant Design
- 🌍 **State**: React Query, Zustand
- 🔥 **Backend**: Supabase (PostgreSQL, Auth, Storage)
- 🖱 **Extras**: React DnD for Drag & Drop, Optimistic UI, Dark Mode (in progress)

## 📌 Main Features
✔ **Project and Task Management**
✔ **Kanban Board System with React DnD**
✔ **Data Persistence in Supabase**
✔ **State Management with React Query and Zustand**
✔ **Cache Optimization and Automatic Sync with React Query**
✔ **User Authentication **
✔ **Dark Mode with Ant Design Tokens (in progress)**

---

## 🛠 Code Structure
```
📦 src
┣ 📂 components
┃ ┣ 📂 kanban
┃ ┃ ┣ 📜 KanbanBoard.tsx # Main board
┃ ┃ ┣ 📜 TaskColumn.tsx # Board column (To Do, In Progress, etc.)
┃ ┃ ┣ 📜 TaskCard.tsx # Individual task card
┃ ┃ ┗ 📜 AddTaskModal.tsx # Modal for adding tasks
┃ ┗ 📂 hooks
┃ ┃ ┗ 📜 useProjects.ts # Hook for managing projects with React Query
┃ ┗ 📂 store
┃ ┃ ┗ 📜 useProjectStore.ts # Handling global state with Zustand
┃ ┗ 📂 lib
┃ ┃ ┣ 📜 supabaseClient.ts # Connecting to Supabase
┃ ┃ ┗ 📜 reactQueryClient.ts # Configuring React Query
┣ 📂 pages
┃ ┗ 📜 Dashboard.tsx # Main page with projects
```

---

## 📌 Key methods in the code
- `fetchProjects()` → Fetches projects with their tasks from Supabase using React Query.
- `addProject(name)` → Adds a new project and syncs it with React Query.
- `addTask(projectId, title)` → Adds a task to a project in Supabase and updates the UI.
- `moveTask(taskId, toStatus)` → Changes the status of a task and updates the database.

---

## 🔜 Next steps
- **End authentication with Google/Auth0 in Supabase**
- **Add notifications with Ant Design**
- **Optimize UI and UX**
- **Allow cross-user collaboration on projects**

---

## 📜 Current status
The project works with project and task uploads from Supabase. Authentication and dark mode are being integrated.
