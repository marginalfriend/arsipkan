import React from "react";
import { Button } from "./ui/button";
import { Building, Building2, Construction } from "lucide-react";
import Link from "next/link";

export default function SideBar() {
  return (
    <aside className="flex flex-col align-middle left-0 w-[25vw] h-screen top-0 sticky bg-white border-r">
      <h1 className="text-center my-3 text-xl font-bold border-b pb-3">
        Surya Karya Mandiri
      </h1>
      <nav>
        <ul className="flex flex-col gap-2 px-2">
          <li>
            <Link href="/developer">
              <Button
                variant="ghost"
                className="w-full justify-start font-semibold gap-2"
              >
                <Building2 />
                <p>Developers</p>
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/project">
              <Button
                variant="ghost"
                className="w-full justify-start font-semibold gap-2"
              >
                <Building />
                <p>Projects</p>
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
