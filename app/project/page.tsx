import ProjectTable from "./components/project-table";
import { CreateProjectDialog } from "./components/create-project-dialog";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 m-0 mb-24">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-bold">Projek</h1>
        <CreateProjectDialog />
      </div>
      <ProjectTable />
    </div>
  );
}