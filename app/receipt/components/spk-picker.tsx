"use client";

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SPK } from "@prisma/client";
import { useEffect, useState } from "react";
import { getSPKs } from "../actions";

export function SPKPicker(form: any) {
  const [spk, setSpk] = useState<SPK[]>([]);

  useEffect(() => {
    getSPKs().then((spk) => setSpk(spk));
  }, []);

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
                <SelectValue placeholder="SPK yang menjadi acuan" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {spk.map((spk: SPK) => {
                return (
                  <SelectItem key={spk.id} value={spk.id}>
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
