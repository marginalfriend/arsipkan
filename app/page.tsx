import AuthButton from "@/components/auth-button";
import { BastForm } from "@/components/bast-form";
import { useEffect } from "react";

export default function Home() {
	return (
		<>
			<header className="flex w-screen flex-col items-center justify-between py-10">
				<AuthButton />
			</header>
			<main className="flex flex-col items-center justify-center gap-10 px-24">
				<BastForm />
			</main>
		</>
	);
}
