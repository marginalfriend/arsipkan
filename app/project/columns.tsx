"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Project = {
  spkNumber: string;
  clientName: string;
  projectName: string;
  date: string;
  city: string;
  value: number;
  remaining: number;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "spkNumber",
    header: "Nomor SPK",
  },
  {
    accessorKey: "clientName",
    header: "Nama Klien",
  },
  {
    accessorKey: "projectName",
    header: "Nama Projek",
  },
  {
    accessorKey: "city",
    header: "Kota Projek",
  },
  {
    accessorKey: "date",
    header: "Tanggal SPK",
  },
  {
    accessorKey: "value",
    header: "Nilai Projek",
  },
  {
    accessorKey: "remaining",
    header: "Yang Belum Dibayar",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(project.spkNumber)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
