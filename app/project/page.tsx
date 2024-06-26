import { DataTable } from "@/components/ui/data-table";
import { Project, columns } from "./columns";
import { getProjects } from "./actions";
import ProjectTable from "./project-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center gap-10 lg:px-20 m-0 mb-24 max-w-[100vw]">
			<Link className="self-start" href={"/project/new"}>
				<Button>Buat Baru</Button>
			</Link>
			<ProjectTable />
    </main>
  );
}