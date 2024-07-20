import { CreateCompanyForm } from "./components/create-company-form";
import { CreateDeveloperForm } from "./components/create-developer-form";

export default function Page() {
  return (
    <main className="grid grid-cols-2 items-center justify-center gap-2 m-0 mb-24 max-w-[100vw]">
      <CreateDeveloperForm />
      <CreateCompanyForm />
    </main>
  );
}
