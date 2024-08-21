"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dateFormatter, formatIDR } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type ProjectColumns = {
  id: string;
	name: string;
  developer: string;
  company: string;
  date: Date;
  value: number;
  receivable: number;
};

const columnHelper = createColumnHelper<ProjectColumns>();

export const columns = [
	columnHelper.accessor("developer", {
		id: "developer",
    header: ({ column }) => (
			<SortingButton column={column} label={"Developer"} />
    ),
  }),
  columnHelper.accessor("company", {
		id: "company",
    header: ({ column }) => (
			<SortingButton column={column} label={"Perusahaan / PT"} />
    ),
  }),
	columnHelper.accessor("name", {
		id: "name",
		header: ({ column }) => <SortingButton column={column} label={"Nama Projek"} />,
	}),
  columnHelper.accessor("date", {
    id: "date",
    header: ({ column }) => (
      <SortingButton column={column} label={"Tanggal SPK"} />
    ),
    cell: (info) => dateFormatter(info.getValue()),
  }),
  columnHelper.accessor("value", {
    id: "value",
    header: ({ column }) => (
      <SortingButton column={column} label={"Nilai Projek"} />
    ),
    cell: (info) => formatIDR(info.getValue()),
  }),
  columnHelper.accessor("receivable", {
    id: "receivable",
    header: ({ column }) => (
      <SortingButton column={column} label={"Jumlah Piutang"} />
    ),
    cell: (info) => formatIDR(info.getValue()),
  }),
  columnHelper.display({
		id: "actions",
		header: "Actions",
    cell: (props) => <ActionsButton />,
  }),
];

export type ProjectTable = {
  id: string; // Unique ID for the project
  name: string; // Project name
  developer: string; // Real estate developer (UUID)
  company: string; // PT (Perseroan Terbatas) working on this project (UUID)
  date: Date; // Agreement date
  value: number; // Value of the project
  receivable: number; // Unpaid value
};

export type Developer = {
  id: string;
  name: string;
};

export type Company = {
  id: string;
  name: string;
};


function SortingButton({ column, label }: { column: any; label: string }) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

function ActionsButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-1 w-6 h-6">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>
					Actions
				</DropdownMenuLabel>
				<DropdownMenuItem>
					Lihat Detail
				</DropdownMenuItem>
				<DropdownMenuItem>
					Buat Kwitansi & Invoice	
				</DropdownMenuItem>
			</DropdownMenuContent>
    </DropdownMenu>
  );
}
