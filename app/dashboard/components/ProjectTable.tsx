"use client";

import { DataTable } from "@/components/ui/data-table";
import React, { Dispatch, useEffect, useState } from "react";
import { columns, developers, projectData } from "./columns";
import { capitalizeWords, formatIDR } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProjectTable() {
  const [totalValue, setTotalValue] = useState(0);
  const [totalReceivable, setTotalReceivable] = useState(0);
  const [developerFilter, setDeveloperFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

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
      <div className="flex justify-between">
        <DeveloperFilter
          developerFilter={developerFilter}
          setDeveloperFilter={setDeveloperFilter}
          developers={developers}
        />
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
      </div>
      <DataTable data={projectData} columns={columns} />
    </div>
  );
}

export default ProjectTable;

function DeveloperFilter({
  setDeveloperFilter,
  developerFilter,
  developers,
}: {
  setDeveloperFilter: Dispatch<React.SetStateAction<string>>;
  developerFilter: string;
  developers: string[];
}) {
  return (
    <Select
      onValueChange={(value) => setDeveloperFilter(value)}
      value={developerFilter}
    >
      <SelectTrigger
        className="w-[180px] px-1 justify-between"
        title="Developer filter dropdown"
      >
        <SelectValue
          className="px-0 text-start"
          placeholder="Developer"
        />
      </SelectTrigger>
      <SelectContent>
        {developers.map((developer) => (
          <SelectItem
            className="text-start"
            value={developer}
            key={developer}
          >
            {capitalizeWords(developer)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
