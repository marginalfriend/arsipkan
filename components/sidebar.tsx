"use client";

import React from "react";
import { Button } from "./ui/button";
import { Building, Building2, Construction } from "lucide-react";
import Link from "next/link";
import AuthButton from "./auth-button";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function SideBar() {
  const { data: session } = useSession();

  return (
    <aside className="flex flex-col align-middle left-0 w-[25vw] h-screen top-0 sticky bg-white border-r">
      <h1 className="text-center my-3 text-xl font-bold border-b pb-3">
        Surya Karya Mandiri
      </h1>
      <nav className="flex flex-col w-full h-full items-center justify-between mb-3 px-2">
        <ul className="flex flex-col gap-2 w-full">
          {/* <li>
            <Link href="/developer">
              <Button
                variant="ghost"
                className="w-full justify-start font-semibold gap-2"
              >
                <Building2 />
                <p>Developers</p>
              </Button>
            </Link>
          </li> */}
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
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center gap-2 bg-primary-foreground p-2 rounded-md border">
            <Image
              src={session?.user.image as string}
              alt="Profile picture"
              width={56}
              height={56}
							className="w-10 h-10 rounded-full"
            />
            <p>{session?.user.name}</p>
          </div>
          <AuthButton className="flex w-full" />
        </div>
      </nav>
    </aside>
  );
}
