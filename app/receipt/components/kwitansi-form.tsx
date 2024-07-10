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
import { toast } from "@/components/ui/use-toast";
import { createNewReceipt } from "../actions";
import { DatePicker } from "@/components/date-picker";
import { SPKPicker } from "./spk-picker";

const FormSchema = z.object({
  diterimaDari: z.string(),
  nomorKwitansi: z.string(),
  uangSejumlah: z.string(),
  realCost: z.string(),
  untukPembayaran: z.string(),
  yangMenerima: z.string(),
  spk: z.string(),
  kota: z.string(),
  date: z.date(),
});

type NameField =
  | "diterimaDari"
  | "nomorKwitansi"
  | "uangSejumlah"
  | "realCost"
  | "untukPembayaran"
  | "yangMenerima"
  | "spk"
  | "kota";

type KwitansiFormField = {
  name: NameField;
  type: string;
  label: string;
  placeHolder: string;
  description: string;
};

export function KwitansiForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      diterimaDari: "",
      nomorKwitansi: "",
      uangSejumlah: "",
      realCost: "",
      untukPembayaran: "",
      yangMenerima: "",
      spk: "",
      kota: "",
      date: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Submit invoked");
    createNewReceipt(data);
  };

  const kwitansiFormFields: KwitansiFormField[] = [
    {
      name: "diterimaDari",
      type: "text",
      label: "Diterima Dari",
      placeHolder: "PT. SUMBER JAYA MAKMUR",
      description: "Orang / entitas yang memberikan uang",
    },
    {
      name: "nomorKwitansi",
      type: "text",
      label: "Nomor Kwitansi",
      placeHolder: "866/KWT-DM/SKM-KML/VI/2024",
      description: "Nomor kwitansi sesuai dengan format",
    },
    {
      name: "uangSejumlah",
      type: "text",
      label: "Uang Sejumlah",
      placeHolder: "100000",
      description: "Jumlah uang yang diterima",
    },
    {
      name: "realCost",
      type: "text",
      label: "Biaya Ril",
      placeHolder: "2000000",
      description: "Biaya total yang harus dibayar",
    },
    {
      name: "untukPembayaran",
      type: "text",
      label: "Untuk Pembayaran",
      placeHolder: "Retensi 5%, Pekerjaan Sipil ...",
      description: "Jumlah uang yang diterima",
    },
    {
      name: "yangMenerima",
      type: "text",
      label: "Yang Menerima",
      placeHolder: "BUDI",
      description: "Orang yang bertanggung jawab menerima uang",
    },
    // {
    //   name: "nomorSpk",
    //   type: "text",
    //   label: "Nomor SPK",
    //   placeHolder: "KML/PO/XX/XX/XXXXX",
    //   description: "Nomor SPK yang menjadi acuan pengerjaan",
    // },
    {
      name: "kota",
      type: "text",
      label: "Kota",
      placeHolder: "Jakarta",
      description: "Kota tempat transaksi berlangsung",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 border p-4 rounded-lg"
      >
        {kwitansiFormFields.map((kwitansiField: KwitansiFormField) => {
          return (
            <FormField
              key={kwitansiField.name}
              control={form.control}
              name={kwitansiField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{kwitansiField.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={kwitansiField.type}
                      placeholder={kwitansiField.placeHolder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{kwitansiField.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <DatePicker form={form} />
        <SPKPicker form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
