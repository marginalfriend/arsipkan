"use client";

import Link from "next/link";
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

export function CityPicker(form: any) {
  type City = {
    id: number;
    name: string;
  };

  type Province = {
    id: number;
    name: string;
  };

  const [cities, setCities]: [City[], Function] = useState([]);
  const [provinces, setProvinces]: [Province[], Function] = useState([]);

  // Fetching provinces data from GoAPI
  useEffect(() => {
    const provincesURL = "https://api.goapi.io/regional/provinsi";
		
    fetch(provincesURL, {
      headers: new Headers({
				"X-API-KEY": "2c40acf8-fa47-56c5-f83e-b34d7ccc",
			}),
    })
		.then((res) => res.json())
		.then((data) => {
			console.log("This is from province fetch")
			console.log(data.data)
			setProvinces(data.data);
		});
  }, []);
	
	const citiesURL = "https://api.goapi.io/regional/kota";

	function fetchCities(province: any) {
		console.log(province);
		fetch(citiesURL + `?provinsi_id=${province}`, {
			headers: new Headers({
      "X-API-KEY": "2c40acf8-fa47-56c5-f83e-b34d7ccc",
    }),
		})
		.then((res) => res.json())
		.then((data) => {
			console.log("This is from city fetch")
			console.log(data)
			setCities(data.data);
		});
	}

  return (
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <>
          <FormItem>
            <FormLabel>Provinsi</FormLabel>
            <Select onValueChange={fetchCities} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih provinsi pengerjaan projek" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {provinces?.map((province) => {
                  return (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormDescription>
              You can manage email addresses in your{" "}
              <Link href="/examples/forms">email settings</Link>.
            </FormDescription>
            <FormMessage />
          </FormItem>
					
          <FormItem>
            <FormLabel>Kota</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kota pengerjaan projek" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cities?.map((city) => {
                  return (
                    <SelectItem key={city.id} value={city.name}>
                      {city.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormDescription>
              You can manage email addresses in your{" "}
              <Link href="/examples/forms">email settings</Link>.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
}
