import {
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
import { getCompanies } from "../actions";

export default function CompanyPicker(form: any) {
  type Company = {
    id: string;
    name: string;
  };

  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    getCompanies().then((data) => setCompanies(data));
  }, []);

  return (
    <FormField
      control={form.control}
      name="company"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Perusahaan / PT</FormLabel>
          <Select onValueChange={field.onChange} defaultValue="">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Perusahaan / PT" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {companies?.map((company) => {
                return (
                  <SelectItem
                    key={company.id}
                    value={JSON.stringify({ id: company.id, name: company.name })}
                  >
                    {company.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormDescription>Pilih perusahaan</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
