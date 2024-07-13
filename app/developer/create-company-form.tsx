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
import { createCompany } from "./actions";
import { toast } from "@/components/ui/use-toast";
import DeveloperPicker from "./developer-picker";

const FormSchema = z.object({
  developer: z.string({
    message: "Developer diperlukan",
  }),
  name: z.string({
    message: "Nama diperlukan",
  }),
});

export function CreateCompanyForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      developer: "",
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const devObject = JSON.parse(data.developer);

		console.log(devObject.id)

    createCompany({ name: data.name, developerId: devObject.id }).then(
      (result) => {
        toast({
          title: result.message,
          description: result.description,
        });
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border p-4 rounded h-full"
      >
				<h2 className="text-center font-semibold text-xl">Perusahaan / PT</h2>
        <DeveloperPicker form={form} />{" "}
        {/*value={JSON.stringify({id: dev.id, name: dev.name, */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Perusahaan / PT.</FormLabel>
              <FormControl>
                <Input placeholder="Sinar Mas" {...field} />
              </FormControl>
              <FormDescription>Tulis nama perusahaan / PT.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
