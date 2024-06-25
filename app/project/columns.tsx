"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Project = {
	spkNumber: string
	clientName: string
	projectName: string
	date: Date
	city: string
	value: number
	remaining: number
}

export const columns: ColumnDef<Project>[] = [
	{
		accessorKey: "spkNumber",
		header: "Nomor SPK",
	},
	{
		accessorKey: "clientName",
		header: "Nama Klien",
	},	{
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
]