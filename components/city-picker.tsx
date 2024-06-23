"use client";

import Link from "next/link";
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
        setProvinces(data.data);
      });
  });

  // Fetching cities from GoAPI
  function fetchCities(province: string) {
    const citiesURL =
      "https://api.goapi.io/regional/kota?provinsi_id=" + province;

    fetch(citiesURL, {
      headers: new Headers({
        "X-API-KEY": "2c40acf8-fa47-56c5-f83e-b34d7ccc",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
                  <SelectValue placeholder="Provinsi" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {provinces?.map((province) => {
                  return (
                    <SelectItem
                      key={province.id}
                      value={province.id.toString()}
                    >
                      {province.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormDescription>
              Pilih provinsi
            </FormDescription>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Kota</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Kota" />
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
              Pilih kota
            </FormDescription>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
}
