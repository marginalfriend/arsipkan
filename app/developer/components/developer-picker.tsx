"use client";

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
import { getDeveloper } from "../actions";

export function DeveloperPicker(form: any) {
  type Developer = {
    id: string;
    name: string;
  };

  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // TO DO: Fix fetch developers
  const fetchDevelopers = () => {
    setIsLoading(true);
    getDeveloper().then((data) => setDevelopers(data));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDevelopers();
  }, [isLoading]);

  return (
    <FormField
      control={form.control}
      name="developer"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Developer</FormLabel>
          <Select onValueChange={field.onChange} defaultValue="">
            <FormControl>
              <SelectTrigger onClick={fetchDevelopers}>
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
