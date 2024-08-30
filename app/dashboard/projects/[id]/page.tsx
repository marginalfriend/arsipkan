import React from "react";
import { projectData } from "../dummy-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/* 

Details to show :
1.	Project Details i.e. developer, company, name, value, receivable.
2.	Project Payment Progress:
	-	Unpaid and Paid Bill
	- Signed Invoices and Receipts

*/

function ProjectDetail({ params }: { params: { id: string } }) {
  const projectDetail = projectData.find((project) => project.id === params.id);

  return (
    <main className="flex flex-col w-screen h-screen">
      <aside className="flex flex-col items-center w-[20vw] h-full fixed left-0 border p-4">
        <div className="flex items-center justify-between">
					<Button variant="outline" className="w-6 h-6 p-1">
						<ArrowLeft className="w-4 h-4" />
					</Button>
          <h1 className="text-lg font-bold ">Project Details</h1>
        </div>
      </aside>
    </main>
  );
}

export default ProjectDetail;
