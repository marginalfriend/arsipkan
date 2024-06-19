import AuthButton from "@/components/auth-button"
import { KwitansiForm } from "./components/kwitansi-form"

export default function Page() {
	return (
		<>
			<main className="flex flex-col items-center justify-center gap-10 px-24 mb-24">
				<KwitansiForm />
			</main>
		</>
	)
}