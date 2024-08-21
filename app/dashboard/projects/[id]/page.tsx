import React from "react";
import { projectData } from "../dummy-data";

function ProjectDetail({ params }: { params: { id: string } }) {

  const projectDetail = projectData.find(
    (project) => project.id === params.id
  );

  return (<main className="flex flex-col w-full h-full">
		<h1>{projectDetail?.name}</h1>
	</main>);
}

export default ProjectDetail;
