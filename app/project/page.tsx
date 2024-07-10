import { DataTable } from "@/components/ui/data-table";
import { Project, columns } from "./components/columns";
import { getProjects } from "./actions";
import ProjectTable from "./components/project-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateProjectDialog } from "./components/create-project-dialog";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center gap-10 lg:px-4 m-0 mb-24 max-w-[100vw]">
      <CreateProjectDialog />
      <ProjectTable />
    </main>
  );
}
