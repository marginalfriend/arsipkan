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
  name: string;
  developer: string;
  company: string;
  date: Date;
  value: number;
  receivable: number;
};

const columnHelper = createColumnHelper<ProjectColumns>();

export const columns = [
  columnHelper.accessor("name", {
    id: "name",
    header: ({ column }) => <SortingButton column={column} label={"Name"} />,
  }),
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

export const projectData: ProjectColumns[] = [
  {
    name: "Green Hills Residence",
    developer: "Indo Property Group",
    company: "PT Sinar Jaya Abadi",
    date: new Date("2023-02-15"),
    value: 50000000000,
    receivable: 10000000000,
  },
  {
    name: "Ocean View Apartments",
    developer: "Nusantara Development",
    company: "PT Cahaya Nusantara",
    date: new Date("2022-10-30"),
    value: 75000000000,
    receivable: 25000000000,
  },
  {
    name: "Sunset Valley",
    developer: "Mega Property Holdings",
    company: "PT Surya Agung",
    date: new Date("2023-06-12"),
    value: 65000000000,
    receivable: 15000000000,
  },
  {
    name: "Skyline Tower",
    developer: "Urban Builders",
    company: "PT Gemilang Konstruksi",
    date: new Date("2023-03-21"),
    value: 80000000000,
    receivable: 30000000000,
  },
  {
    name: "Lakeside Villas",
    developer: "Harmony Development",
    company: "PT Sejahtera Mandiri",
    date: new Date("2022-12-05"),
    value: 60000000000,
    receivable: 20000000000,
  },
];

export const developers: string[] = [
  "Indo Property Group",
  "Nusantara Development",
  "Mega Property Holdings",
  "Urban Builders",
  "Harmony Development",
];

export const companies: string[] = [
  "PT Sinar Jaya Abadi",
  "PT Cahaya Nusantara",
  "PT Surya Agung",
  "PT Gemilang Konstruksi",
  "PT Sejahtera Mandiri",
];


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
