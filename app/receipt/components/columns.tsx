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
import { Bill } from "@prisma/client";
import { dateFormatter } from "@/lib/utils";

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: "spk_id",
    header: "Projek",
  },
  {
    accessorKey: "bill_Sequence",
    header: "Urutan",
  },
  {
    accessorKey: "receipt_sequence",
    header: "Nomor Kwitansi / Invoice",
  },
  {
    accessorKey: "issuer",
    header: "Penerbit",
  },
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: (data) => {
      return dateFormatter(data.row.original.date);
    },
  },
  {
    accessorKey: "amount",
    header: "Jumlah",
  },
  {
    accessorKey: "vat",
    header: "Pajak",
  },
  {
    accessorKey: "receiver",
    header: "Penerima",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const receipt = row.original;

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
              onClick={() =>
                navigator.clipboard.writeText(
                  receipt.receipt_sequence.toString()
                )
              }
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
