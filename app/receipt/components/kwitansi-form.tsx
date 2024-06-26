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

const FormSchema = z.object({
  diterimaDari: z.string(),
  nomorKwitansi: z.string(),
  uangSejumlah: z.string(),
  realCost: z.string(),
  untukPembayaran: z.string(),
  yangMenerima: z.string(),
  nomorSpk: z.string(),
  kota: z.string(),
  tanggalTransaksi: z.date({
    required_error: "Tanggal transaksi diperlukan",
  }),
});

export function KwitansiForm() {
  type KwitansiFormField = {
    name:
      | "diterimaDari"
      | "nomorKwitansi"
      | "uangSejumlah"
      | "realCost"
      | "untukPembayaran"
      | "yangMenerima"
      | "nomorSpk"
      | "kota";
    type: string;
    label: string;
    placeHolder: string;
    description: string;
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      diterimaDari: "",
      nomorKwitansi: "",
      untukPembayaran: "",
      yangMenerima: "",
      nomorSpk: "",
      kota: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    createNewReceipt(data);
  }

  const kwitansiFormFields: KwitansiFormField[] = [
    {
      name: "diterimaDari",
      type: "string",
      label: "Diterima Dari",
      placeHolder: "PT. SUMBER JAYA MAKMUR",
      description: "Orang / entitas yang memberikan uang",
    },
    {
      name: "nomorKwitansi",
      type: "string",
      label: "Nomor Kwitansi",
      placeHolder: "866/KWT-DM/SKM-KML/VI/2024",
      description: "Nomor kwitansi sesuai dengan format",
    },
    {
      name: "uangSejumlah",
      type: "number",
      label: "Uang Sejumlah",
      placeHolder: "100000",
      description: "Jumlah uang yang diterima",
    },
    {
      name: "realCost",
      type: "number",
      label: "Biaya Ril",
      placeHolder: "2000000",
      description: "Biaya total yang harus dibayar",
    },
    {
      name: "untukPembayaran",
      type: "string",
      label: "Untuk Pembayaran",
      placeHolder: "Retensi 5%, Pekerjaan Sipil ...",
      description: "Jumlah uang yang diterima",
    },
    {
      name: "yangMenerima",
      type: "string",
      label: "Yang Menerima",
      placeHolder: "BUDI",
      description: "Orang yang bertanggung jawab menerima uang",
    },
    {
      name: "nomorSpk",
      type: "string",
      label: "Nomor SPK",
      placeHolder: "KML/PO/XX/XX/XXXXX",
      description: "Nomor SPK yang menjadi acuan pengerjaan",
    },
    {
      name: "kota",
      type: "string",
      label: "Kota",
      placeHolder: "Jakarta",
      description: "Kota tempat transaksi berlangsung",
    },
  ];
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 border p-4 rounded-lg"
      >
        <h2 className="text-center text-4xl font-semibold">Kwitansi Baru</h2>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
