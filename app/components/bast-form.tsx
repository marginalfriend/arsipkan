'use client'

import { useForm } from "react-hook-form"

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createNewDoc } from "@/app/actions"
import { useSession } from "next-auth/react"

export function BastForm() {
	const date = new Intl.DateTimeFormat(
		'id-ID',
		{
			dateStyle: 'full',
		}
	).format(Date.now())

	const form = useForm()
	const session = useSession()

	function onSubmit(data: any) {
		const accessToken = session.data?.accessToken

		createNewDoc(data["title"], accessToken)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create New Docs</CardTitle>
				<CardDescription>New docs with title</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form 
					onSubmit={form.handleSubmit(onSubmit)} 
					className="space-y-8"
					>
						<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Title..." {...field} />
									</FormControl>
									<FormDescription>
										This will be the title of your docs.
									</FormDescription>
								<FormMessage />
							</FormItem>
						)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}