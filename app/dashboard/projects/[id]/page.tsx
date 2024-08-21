import React from "react";
import { projectData } from "../dummy-data";

function ProjectDetail({ params }: { params: { id: string } }) {

  const projectDetail = projectData.find(
    (project) => project.id === params.id
  );

  return <div>{projectDetail?.name}</div>;
}

export default ProjectDetail;
