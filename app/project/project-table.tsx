"use client";

import { DataTable } from "@/components/ui/data-table";
import { Project, columns } from "./columns";
import { useEffect, useState } from "react";
import { getProjects } from "./actions";

export default function ProjectTable() {
  const [data, setData] = useState<Project[]>([]);

  useEffect(() => {
		getProjects().then(d => setData(d))
	}, []);
	
  return <DataTable columns={columns} data={data} />;
}
