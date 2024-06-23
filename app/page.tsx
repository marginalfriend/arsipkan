import AuthButton from "./components/auth-button";
import { BastForm } from "./components/bast-form";
import { Header } from "@/app/components/header";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-10 px-24">
        <BastForm />
      </main>
    </>
  );
}
