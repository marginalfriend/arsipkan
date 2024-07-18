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
import { createNewReceipt } from "../actions";
import { SPKPicker } from "./spk-picker";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  // billSequence: z.string(),
  receiptSequence: z.string(),
  amount: z.string(),
  paymentFor: z.string(),
  vat: z.string(),
  issuer: z.string(),
  receiver: z.string(),
  spk: z.string(),
  date: z.date(),
});

export type KwitansiSchema = z.infer<typeof FormSchema>

type NameField =
  // | "billSequence"
  | "receiptSequence"
  | "paymentFor"
  | "amount"
  | "vat"
  | "issuer"
  | "receiver";

type KwitansiFormField = {
  name: NameField;
  type: string;
  label: string;
  placeHolder: string;
  description: string;
};

export function KwitansiForm() {
	const router = useRouter()
  const form = useForm<KwitansiSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // billSequence: "",
      receiptSequence: "",
      amount: "",
      vat: "",
      issuer: "",
      receiver: "",
      spk: "",
      date: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    createNewReceipt(data).then((result) => {
      toast({
        variant: result.toastVariant,
        title: result.message,
        description: result.description,
      });
    }).then(router.refresh);

		form.reset()
  };

  const kwitansiFormFields: KwitansiFormField[] = [
    {
      name: "receiptSequence",
      type: "text",
      label: "Nomor Kwitansi / Invoice",
      placeHolder: "911",
      description: "Nomor kwitansi / invoice",
    },
    {
      name: "issuer",
      type: "text",
      label: "Penerbit Tagihan",
      placeHolder: "Daffa Moreri",
      description: "Yang menulis tagihan",
    },
    {
      name: "receiver",
      type: "text",
      label: "Penerima",
      placeHolder: "Rivai Madah",
      description: "Uang dari tagihan",
    },
    {
      name: "paymentFor",
      type: "text",
      label: "Untuk Pembayaran",
      placeHolder: "Retensi 5%",
      description: "Keterangan kwitansi",
    },
    {
      name: "amount",
      type: "text",
      label: "Jumlah",
      placeHolder: "500000000",
      description: "Jumlah tunai yang ditagih",
    },
    {
      name: "vat",
      type: "text",
      label: "Pajak",
      placeHolder: "5500000",
      description: "Pajak dari tagihan",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 p-4"
      >
        <SPKPicker form={form} />
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
