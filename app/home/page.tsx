import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function HomePage() {
  const navLinks = [
    {
      name: "List Projek",
      href: "/dashboard/projects",
    },
    {
      name: "List Berkas Revisi",
      href: "/dashboard/revisions",
    },
    {
      name: "List RAB",
      href: "/dashboard/rab",
    },
    {
      name: "List Kwitansi",
      href: "/dashboard/receipts",
    },
    {
      name: "List Surat",
      href: "/dashboard/letters",
    },
  ];

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-2">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Surya Karya Mandiri
        </h1>
        <div className="flex flex-col gap-2 w-full">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.name}>
              <Button variant="outline" className="w-full">
                {link.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
