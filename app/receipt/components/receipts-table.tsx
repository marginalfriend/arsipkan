"use client";

import { useEffect, useState } from "react";
import { getReceipts } from "../actions";
import { Bill } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export function ReceiptsTable() {
  const [data, setData] = useState<Bill[]>([]);

  useEffect(() => {
    getReceipts().then((result) => setData(result));
  }, []);

  return <DataTable columns={columns} data={data} />;
}
