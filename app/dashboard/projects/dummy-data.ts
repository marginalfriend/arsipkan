import { Company, Developer, ProjectTable } from "./components/columns";

export const developers: Developer[] = [
	{ id: "b3e53f87-f9d4-4e2d-8e1a-73a2f6a17b90", name: "Indo Property Group" },
	{ id: "fa75f0a1-0b3c-426e-87a4-7b1b1a5f060c", name: "Nusantara Development" },
	{
		id: "c9e2b4a2-b897-4bb8-bb9d-d4e64f4a2a5d",
		name: "Mega Property Holdings",
	},
	{ id: "5e9b0d4c-d76d-45b3-8392-7e0a6016c1e1", name: "Urban Builders" },
	{ id: "fc248d8f-c4b7-4397-9e72-0933dc3b2933", name: "Harmony Development" },
];

export const companies: Company[] = [
	{ id: "a2c5b1f4-81c4-41a1-bb25-8b9c6d8e1f5e", name: "PT Sinar Jaya Abadi" },
	{ id: "e9f0c9a5-7fbc-4e47-9463-8fb3d9a4fef4", name: "PT Cahaya Nusantara" },
	{ id: "2f7b2e7b-4186-4bc3-8b14-975d1b4ef54d", name: "PT Surya Agung" },
	{
		id: "74f4b9e8-9e3d-4f59-bf02-5217f07c4e1e",
		name: "PT Gemilang Konstruksi",
	},
	{ id: "bf837d94-3c8f-49a5-bd1e-ff78e2a6c7a3", name: "PT Sejahtera Mandiri" },
];

export const projectData: ProjectTable[] = [
	{
		id: "6f0e577d-98f6-456d-88e0-9c1f523c69f5",
		name: "Green Hills Residence",
		developer: "b3e53f87-f9d4-4e2d-8e1a-73a2f6a17b90", // Indo Property Group
		company: "a2c5b1f4-81c4-41a1-bb25-8b9c6d8e1f5e", // PT Sinar Jaya Abadi
		date: new Date("2023-02-15"),
		value: 50000000000,
		receivable: 10000000000,
	},
	{
		id: "c14b1eb9-bf02-4398-85a9-0fa4f3d7b839",
		name: "Ocean View Apartments",
		developer: "fa75f0a1-0b3c-426e-87a4-7b1b1a5f060c", // Nusantara Development
		company: "e9f0c9a5-7fbc-4e47-9463-8fb3d9a4fef4", // PT Cahaya Nusantara
		date: new Date("2022-10-30"),
		value: 75000000000,
		receivable: 25000000000,
	},
	{
		id: "e37295a9-c8c5-405a-bb84-8c94c16946be",
		name: "Sunset Valley",
		developer: "c9e2b4a2-b897-4bb8-bb9d-d4e64f4a2a5d", // Mega Property Holdings
		company: "2f7b2e7b-4186-4bc3-8b14-975d1b4ef54d", // PT Surya Agung
		date: new Date("2023-06-12"),
		value: 65000000000,
		receivable: 15000000000,
	},
	{
		id: "c35e0f5c-ece8-4904-8c4a-dc77a6b3f5a5",
		name: "Skyline Tower",
		developer: "5e9b0d4c-d76d-45b3-8392-7e0a6016c1e1", // Urban Builders
		company: "74f4b9e8-9e3d-4f59-bf02-5217f07c4e1e", // PT Gemilang Konstruksi
		date: new Date("2023-03-21"),
		value: 80000000000,
		receivable: 30000000000,
	},
	{
		id: "f64f3c3b-b547-4e5b-a3da-8f96cfeb5a22",
		name: "Lakeside Villas",
		developer: "fc248d8f-c4b7-4397-9e72-0933dc3b2933", // Harmony Development
		company: "bf837d94-3c8f-49a5-bd1e-ff78e2a6c7a3", // PT Sejahtera Mandiri
		date: new Date("2022-12-05"),
		value: 60000000000,
		receivable: 20000000000,
	},
];