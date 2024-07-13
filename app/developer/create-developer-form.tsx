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
import { createDeveloper } from "./actions";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  name: z.string({
    message: "Nama diperlukan",
  }),
});

export function CreateDeveloperForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    createDeveloper(data.name).then((data) => {
			toast({
				title: data.message,
				description: data.description
			})
		})
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border p-4 rounded h-full"
      >
        <h2 className="text-center font-semibold text-xl">Developer</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Developer</FormLabel>
              <FormControl>
                <Input placeholder="Sinar Mas" {...field} />
              </FormControl>
              <FormDescription>Tulis nama developer.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
