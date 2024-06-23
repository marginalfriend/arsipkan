"use client";

import Link from "next/link";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
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
				"X-API-KEY": process.env.GOAPI_KEY ? process.env.GOAPI_KEY : "",
			}),
    })
    .then(res => res.json())
		.then(data => setProvinces(data.data)),
});

	function fetchCities(province: any) {
		fetch(citiesURL + `?provinsi_id=${province}`, {
			headers: new Headers({
      "X-API-KEY": process.env.GOAPI_KEY ? process.env.GOAPI_KEY : "",
    }),
		})
		.then((res) => res.json())
		.then((data) => {
			console.log("This is from city fetch")
			console.log(data)
			setCities(data.data);
		});
	}

  const [cities, setCities]: [City[], Function] = useState([]);

	// Fetching cities data from GoAPI
  useEffect(() => {
    "use server";

		const citiesURL = "https://api.goapi.io/regional/kota"

		fetch(citiesURL, {
			headers: new Headers({
				"X-API-KEY": "2c40acf8-fa47-56c5-f83e-b34d7ccc"
			})
		})
		.then(res => res.json())
		.then(data => setCities(data.data))

  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
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
                    <SelectItem key={province.id} value={province.id.toString()}>
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
