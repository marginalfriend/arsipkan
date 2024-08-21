"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button, ButtonProps } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function AuthButton({ ...props }: ButtonProps) {
  const { data: session } = useSession();

  if (session) {
    if (session.user) {
      return (
        <Button variant="destructive" {...props} onClick={() => signOut()}>
          Sign out
        </Button>
      );
    }
  } else {
    return (
      <Button {...props} onClick={() => signIn("google").then(() => redirect('/dashboard'))}>
        Sign in
      </Button>
    );
  }
}
