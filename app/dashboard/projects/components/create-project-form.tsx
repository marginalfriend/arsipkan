import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
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
import { DatePicker } from "@/components/date-picker";
import { Plus } from "lucide-react";
import { useState } from "react";

const FormSchema = z.object({
  spkDocument: z.string(),
  company: z.string(),
  spkNumber: z.string(),
  clientName: z.string(),
  projectName: z.string(),
  value: z.string(),
  city: z.string(),
  date: z.date(),
});

type ProjectFormField = {
  name: "spkNumber" | "projectName" | "value" | "clientName" | "spkDocument";
  type: string;
  label: string;
  placeHolder: string;
  description: string;
};

export function CreateProjectForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      spkDocument: "",
      spkNumber: "",
      clientName: "",
      projectName: "",
      value: "",
      date: new Date(),
    },
  });

  const projectFormFields: ProjectFormField[] = [
    {
      name: "spkNumber",
      type: "text",
      label: "Nomor SPK",
      placeHolder: "XXXX/XX/XXX/XXX/XXX",
      description: "Nomor SPK sesuai dengan client",
    },
    {
      name: "spkDocument",
      type: "file",
      label: "Dokumen SPK",
      placeHolder: "Pilih file",
      description: "Dokumen SPK sesuai dengan projek",
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 w-full lg:w-fit">
          <Plus className="w-4 h-4" /> Projek Baru
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-2xl">
            Buat Projek Baru
          </DialogTitle>
        </DialogHeader>

        <div className="h-[80vh] overflow-y-auto">
          <Form {...form}>
            <form className="w-full space-y-6 p-4 m-0">
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
                        <FormDescription>
                          {formField.description}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
              <DatePicker form={form} />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
