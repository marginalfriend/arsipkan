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
import Link from "next/link";
import { usePathname } from "next/navigation";

export type ProjectColumns = {
  id: string;
  name: string;
  developer: Developer;
  company: Company;
  date: Date;
  value: number;
  receivable: number;
  location: string;
};

const columnHelper = createColumnHelper<ProjectColumns>();

export const columns = [
  columnHelper.accessor("developer", {
    id: "developer",
    header: ({ column }) => (
      <SortingButton column={column} label={"Developer"} />
    ),
    cell: ({ row }) => (
      <span className="text-xs">{row.original.developer.name}</span>
    ),
  }),
  columnHelper.accessor("company", {
    id: "company",
    header: ({ column }) => (
      <SortingButton column={column} label={"Perusahaan / PT"} />
    ),
    cell: ({ row }) => (
      <span className="text-xs">{row.original.company.name}</span>
    ),
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: ({ column }) => (
      <SortingButton column={column} label={"Nama Projek"} />
    ),
    cell: ({ row }) => <span className="text-xs">{row.getValue("name")}</span>,
  }),
  columnHelper.accessor("location", {
    id: "location",
    header: ({ column }) => <SortingButton column={column} label={"Lokasi"} />,
    cell: ({ row }) => <span className="text-xs">{row.original.location}</span>,
  }),
  columnHelper.accessor("date", {
    id: "date",
    header: ({ column }) => (
      <SortingButton column={column} label={"Tanggal SPK"} />
    ),
    cell: (info) => (
      <span className="text-xs">{dateFormatter(info.getValue())}</span>
    ),
  }),
  columnHelper.accessor("value", {
    id: "value",
    header: ({ column }) => (
      <SortingButton column={column} label={"Nilai Projek"} />
    ),
    cell: (info) => (
      <span className="text-xs">{formatIDR(info.getValue())}</span>
    ),
  }),
  columnHelper.accessor("receivable", {
    id: "receivable",
    header: ({ column }) => (
      <SortingButton column={column} label={"Jumlah Piutang"} />
    ),
    cell: (info) => (
      <span className="text-xs">{formatIDR(info.getValue())}</span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsButton projectId={row.original.id} />,
  }),
];

export type ProjectTable = {
  id: string; // Unique ID for the project
  name: string; // Project name
  developer: Developer;
  company: Company;
  date: Date; // Agreement date
  value: number; // Value of the project
  receivable: number; // Unpaid value
  location: string; // Location of the project
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

function ActionsButton({ projectId }: { projectId: string }) {
  const path = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-1 w-6 h-6">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Link href={`${path}/${projectId}`}>
          <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Buat Kwitansi & Invoice</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
