"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { createNewReceipt } from "../actions"
import { DatePickerFormField } from "./date-picker-form-field"

const FormSchema = z.object({
	diterimaDari		: z.string(),
	nomorKwitansi		: z.string(),
	uangSejumlah		: z.string(),
	realCost			: z.string(),
	untukPembayaran		: z.string(),
	yangMenerima		: z.string(),
	nomorSpk			: z.string(),
	kota				: z.string(),
	tanggalTransaksi	: z.date({
		required_error: "Tanggal transaksi diperlukan"
	}),
})

export function CreateForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			// To-do
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		createNewReceipt(data)
	}

	/* 
		New Input Lists:
		- SPK Number	- Text
		- Client Name	- Text
		- Project Name	- Text
		- Value			- Integer
		- Date			- Date
		- City 			- Drop Down
	*/

	const projectFormFields = [
		{
			name: "",
			type: "",
			label: "",
			placeHolder: "",
			description: ""
		}
	]
	return (
		<Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 border p-4 rounded-lg">
			<h2 className="text-center text-4xl font-semibold">Kwitansi Baru</h2>
			{
				projectFormFields.map((formField) => {
					return (
						<FormField
						key={formField.name}
						control={form.control}
						name={formField.name}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{formField.label}</FormLabel>
								<FormControl>
									<Input type={formField.type} placeholder={formField.placeHolder} {...field} />
								</FormControl>
								<FormDescription>
									{formField.description}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
						/>
					)
				})
			}
			<DatePickerFormField form={ form } />
			<Button type="submit">Submit</Button>
		</form>
		</Form>
	)
}
