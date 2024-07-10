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
import { getCities, getProvinces } from "../actions";

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

  const fetchProvinces = () => {
    getProvinces().then((data) => setProvinces(data));
  };

  const fetchCities = (provinceId: string) => {
    getCities(parseInt(provinceId)).then((data) => setCities(data));
  };

  return (
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <>
          <FormItem>
            <FormLabel>Provinsi</FormLabel>
            <Select onValueChange={fetchCities} defaultValue="">
              <FormControl>
                <SelectTrigger onClick={fetchProvinces}>
                  <SelectValue placeholder="Provinsi" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <div className="overflow-y-auto">
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
                </div>
              </SelectContent>
            </Select>
            <FormDescription>Pilih provinsi</FormDescription>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Kota</FormLabel>
            <Select onValueChange={field.onChange} defaultValue="">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Kota" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cities?.map((city) => {
                  return (
                    <SelectItem
                      key={city.id}
                      value={JSON.stringify({ id: city.id, name: city.name })}
                    >
                      {city.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormDescription>Pilih kota</FormDescription>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
}
