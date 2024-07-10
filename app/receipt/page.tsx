import { CreateKwitansiDialog } from "./components/create-kwitansi-dialog";

export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-10 px-4 mb-24">
        <CreateKwitansiDialog />
      </main>
    </>
  );
}
