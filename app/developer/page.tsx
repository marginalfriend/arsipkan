import { CreateCompanyForm } from "./create-company-form";
import { CreateDeveloperForm } from "./create-developer-form";

export default function Page() {
	return (
		<main className="grid grid-cols-2 items-center justify-center gap-5 lg:px-4 m-0 mb-24 max-w-[100vw]">
			<CreateDeveloperForm />
			<CreateCompanyForm />
		</main>
	)
}