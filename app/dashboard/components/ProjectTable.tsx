"use client";

import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import { columns, projectData } from "./columns";
import { formatIDR } from "@/lib/utils";

function ProjectTable() {
  const [totalValue, setTotalValue] = useState(0);
  const [totalReceivable, setTotalReceivable] = useState(0);

  useEffect(() => {
    setTotalValue(
      projectData.map((data) => data.value).reduce((a, b) => a + b)
    );
    setTotalReceivable(
      projectData.map((data) => data.receivable).reduce((a, b) => a + b)
    );
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end gap-2">
        <div className="flex flex-col px-4 py-4 border rounded w-fit">
          <h1 className="font-bold text-xl">Total Nilai</h1>
          <h1>{formatIDR(totalValue)}</h1>
        </div>
        <div className="flex flex-col px-4 py-4 border rounded w-fit">
          <h1 className="font-bold text-xl">Total Piutang</h1>
          <h1>{formatIDR(totalReceivable)}</h1>
        </div>
      </div>
      <DataTable data={projectData} columns={columns} />
    </div>
  );
}

export default ProjectTable;
