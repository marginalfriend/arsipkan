"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { PrismaClient, SPK } from "@prisma/client";
import { spks } from "./actions";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

const prisma = new PrismaClient()

export function SPKPicker(form: any) {
	const [spk, setSpk] = useState<SPK []>([])

	useEffect(() => {
		spks().then(spk => setSpk(spk))
	}, [])

  return (
    <FormField
      control={form.control}
      name="spk"
      render={({ field }) => (
        <FormItem>
          <FormLabel>SPK</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {spk.map((spk: SPK) => {
                return (
                  <SelectItem key={spk.id} value={spk.projectName}>
                    {spk.projectName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormDescription>
            Pilih SPK yang menjadi acuan kwitansi
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
