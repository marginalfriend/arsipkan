"use client";

import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import { columns, companies, developers, projectData } from "./columns";
import { capitalizeWords, formatIDR } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnFilter } from "@tanstack/react-table";

function ProjectTable() {
  const [totalValue, setTotalValue] = useState(0);
  const [totalReceivable, setTotalReceivable] = useState(0);
  const [filter, setFilter] = useState<ColumnFilter>({
    id: "",
    value: "",
  });

  const handleFilterChange = (filter: ColumnFilter) => {
    setFilter(filter);
  };

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
      <div className="flex flex-col-reverse lg:flex-row justify-between items-end gap-2">
        <div className="flex gap-2">
					
          {/* Developer filter selector */}
          <Select
            value={filter.id === "developer" ? (filter.value as string) : ""}
            onValueChange={(value) =>
              handleFilterChange({
                id: "developer",
                value,
              })
            }
          >
            <SelectTrigger
              className="w-[180px] px-0 p-1"
              title="Developer filter dropdown"
            >
              <SelectValue
                className="px-0 text-start"
                placeholder={
                  <span className="flex gap-2 items-center text-muted-foreground">
                    <Filter className="ml-2 w-4 h-4" /> Developer
                  </span>
                }
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

          {/* Company filter selector */}
          <Select
            value={filter.id === "company" ? (filter.value as string) : ""}
            onValueChange={(value) =>
              handleFilterChange({
                id: "company",
                value,
              })
            }
          >
            <SelectTrigger
              className="w-[180px] px-1 justify-between"
              title="Company filter dropdown"
            >
              <SelectValue
                className="px-0 text-start"
                placeholder={
                  <span className="flex gap-2 items-center text-muted-foreground">
                    <Filter className="ml-2 w-4 h-4" /> Perusahaan / PT
                  </span>
                }
              />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem
                  className="text-start"
                  value={company}
                  key={company}
                >
                  {capitalizeWords(company)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>
        <Button className="flex gap-2 w-full lg:w-fit">
          <Plus className="w-4 h-4" /> Projek Baru
        </Button>
        <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-fit lg:justify-end">
          <div className="flex flex-col px-4 py-4 border rounded w-full lg:w-fit">
            <h1 className="font-bold text-xl">Total Nilai</h1>
            <h1>{formatIDR(totalValue)}</h1>
          </div>
          <div className="flex flex-col px-4 py-4 border rounded w-full lg:w-fit">
            <h1 className="font-bold text-xl">Total Piutang</h1>
            <h1>{formatIDR(totalReceivable)}</h1>
          </div>
        </div>
      </div>
      <DataTable data={projectData} columns={columns} filter={filter} />
    </div>
  );
}

export default ProjectTable;
