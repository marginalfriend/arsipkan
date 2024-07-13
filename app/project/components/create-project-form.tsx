"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { createFolder, createProject } from "../actions";
import { DatePicker } from "@/components/date-picker";
import { toast, useToast } from "@/components/ui/use-toast";
import { CityPicker } from "./city-picker";
import CompanyPicker from "./company-picker";

const FormSchema = z.object({
	company: z.string(),
  spkNumber: z.string(),
  clientName: z.string(),
  projectName: z.string(),
  value: z.string(),
  city: z.string(),
  date: z.date(),
});

type ProjectFormField = {
  name: "spkNumber" | "clientName" | "projectName" | "value";
  type: string;
  label: string;
  placeHolder: string;
  description: string;
};

export function CreateProjectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      spkNumber: "",
      clientName: "",
      projectName: "",
      value: "",
      date: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    createProject(data).then((result) => {
      toast({
        variant: result.toastVariant,
        title: result.message,
        description: result.description,
      });
    });
  };

  const projectFormFields: ProjectFormField[] = [
    {
      name: "spkNumber",
      type: "text",
      label: "Nomor SPK",
      placeHolder: "XXXX/XX/XXX/XXX/XXX",
      description: "Nomor SPK sesuai dengan client",
    },
    {
      name: "projectName",
      type: "text",
      label: "Nama Projek",
      placeHolder: "Pemasangan Panel Surya",
      description: "Tulis nama projek sesuai dengan SPK",
    },
    {
      name: "clientName",
      type: "text",
      label: "Nama Client",
      placeHolder: "PT. JAYA ABADI",
      description: "Nama perseroan client",
    },
    {
      name: "value",
      type: "text",
      label: "Nilai Projek",
      placeHolder: "1000000000",
      description: "Nilai keseluruhan projek sesuai dengan RAB",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 border p-4 rounded-lg m-0"
      >
				<CompanyPicker form={form}/>
        {projectFormFields.map((formField: ProjectFormField) => {
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
        <CityPicker form={form} />
        <DatePicker form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
