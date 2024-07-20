import { CreateDeveloperDialog } from "./components/create-developer-dialog";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 m-0 mb-24">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-bold">Developer</h1>
        <CreateDeveloperDialog />
      </div>
    </div>
  );
}
