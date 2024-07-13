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
import { getDeveloepr } from "./actions";

export default function DeveloperPicker(form: any) {
  type Developer = {
    id: string;
    name: string;
  };

  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    getDeveloepr().then((data) => setDevelopers(data));
  }, []);

  return (
    <FormField
      control={form.control}
      name="developer"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Developer</FormLabel>
          <Select onValueChange={field.onChange} defaultValue="">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Developer" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {developers?.map((dev) => {
                return (
                  <SelectItem
                    key={dev.id}
                    value={JSON.stringify({
                      id: dev.id,
                      name: dev.name,
                    })}
                  >
                    {dev.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormDescription>Pilih developer</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
