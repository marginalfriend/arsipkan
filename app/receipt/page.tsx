import { CreateKwitansiDialog } from "./components/create-kwitansi-dialog";

export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-4 lg:px-4 m-0 mb-24 max-w-[100vw]">
        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-bold">Projek</h1>
          <CreateKwitansiDialog />
        </div>
				
      </main>
    </>
  );
}
