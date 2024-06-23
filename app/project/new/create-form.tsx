"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNewReceipt } from "./actions";
import { DatePicker } from "@/components/date-picker";
import { CityPicker } from "@/components/city-picker";

/* 
		New Input Lists:
		- SPK Number	- Text
		- Client Name	- Text
		- Project Name	- Text
		- Value			- Integer
		- Date			- Date
		- City 			- Drop Down
	*/

const FormSchema = z.object({
  spkNumber: z.string(),
  clientName: z.string(),
  projectName: z.string(),
  value: z.number(),
  date: z.date(),
  city: z.object({
    id: z.number(),
    city: z.string(),
  }),
});

export function CreateForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createNewReceipt(data);
  }

  const projectFormFields = [
    {
      name: "spkNumber",
      type: "",
      label: "",
      placeHolder: "",
      description: "",
    },
    {
      name: "projectName",
      type: "",
      label: "",
      placeHolder: "",
      description: "",
    },
    {
      name: "clientName",
      type: "",
      label: "",
      placeHolder: "",
      description: "",
    },
    {
      name: "value",
      type: "",
      label: "",
      placeHolder: "",
      description: "",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 border p-4 rounded-lg"
      >
        <h2 className="text-center text-4xl font-semibold">Project Baru</h2>
        {projectFormFields.map((formField) => {
          return (
            <FormField
              key={formField.name}
              control={form.control}
              name={formField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formField.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={formField.type}
                      placeholder={formField.placeHolder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{formField.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <DatePicker form={form} />
        <CityPicker form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
