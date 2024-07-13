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
import { createNewReceipt, insertNewReceipt } from "../actions";
import { DatePicker } from "@/components/date-picker";
import { SPKPicker } from "./spk-picker";
import { Bill } from "@prisma/client";

const FormSchema = z.object({
  billSequence: z.string(),
  receiptSequence: z.string(),
  amount: z.string(),
  vat: z.string(),
  issuer: z.string(),
  receiver: z.string(),
  spk: z.string(),
  date: z.date(),
});

type NameField =
  | "billSequence"
  | "receiptSequence"
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      billSequence: "",
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
    const toDatabase: Bill = {
      id: "",
      receipt_sequence: parseInt(data.receiptSequence),
      bill_sequence: parseInt(data.billSequence),
      issuer: data.issuer,
      date: data.date,
      amount: parseInt(data.amount),
      vat: data.vat ? parseInt(data.vat) : parseInt(data.amount) * (11 / 100),
      receiver: data.receiver,
      spk_id: data.spk,
    };

    insertNewReceipt(toDatabase).then((result) => {
      toast({
        variant: result.toastVariant,
        title: result.message,
        description: result.description,
      });
    });
  };

  const kwitansiFormFields: KwitansiFormField[] = [
    {
      name: "billSequence",
      type: "text",
      label: "Urutan Tagihan",
      placeHolder: "1",
      description: "Urutan tagihan berdasarkan projek",
    },
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
      description: "Pajak dari tagihan (kosongkan jika 11%)",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 border p-4 rounded-lg"
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
