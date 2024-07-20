"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker } from "@/components/date-picker";
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
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createProject } from "../actions";
import CompanyPicker from "./company-picker";
import { useState } from "react";

const FormSchema = z.object({
  company: z.string(),
  spkNumber: z.string(),
  projectName: z.string(),
  value: z.string(),
  city: z.string(),
  date: z.date(),
});

type ProjectFormField = {
  name: "spkNumber" | "projectName" | "value"; // | "clientName";
  type: string;
  label: string;
  placeHolder: string;
  description: string;
};

export function CreateProjectForm() {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      spkNumber: "",
      projectName: "",
      value: "",
      date: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsloading(true);
    try {
      createProject(data)
        .then((result) => {
          toast({
            variant: "default",
            title: "Berhasil",
            description: "Berhasil membuat projek.",
          });
        })
        .then(router.refresh);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsloading(false);
    }
    form.reset();
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
        className="w-full space-y-6 p-4 m-0"
      >
        <CompanyPicker form={form} />
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
        <DatePicker form={form} />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
