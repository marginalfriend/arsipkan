"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function PageNotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-4 w-screen h-screen justify-center items-center">
      <h1 className="text-5xl font-bold">Page Not Found</h1>
      <Button className="flex gap-2" onClick={() => router.back()}>
        <ArrowBigLeftIcon className="w-5 h-5" /> Go Back
      </Button>
    </main>
  );
}

export default PageNotFound;
