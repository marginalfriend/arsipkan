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

const FormSchema = z.object({
	diterimaDari: z.string()
})

export function KwitansiForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			diterimaDari: ""
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
		title: "You submitted the following values:",
		description: (
			<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
			<code className="text-white">{JSON.stringify(data, null, 2)}</code>
			</pre>
		),
		})
	}

	return (
		<Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
			<FormField
			control={form.control}
			name="diterimaDari"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Sudah Diterima Dari</FormLabel>
					<FormControl>
						<Input placeholder="PT. TERIMA JADI JAYA MAKMUR" {...field} />
					</FormControl>
					<FormDescription>
						DARI MANA UANGNYAAA????
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
			/>
			<Button type="submit">Submit</Button>
		</form>
		</Form>
	)
}
