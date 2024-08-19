import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen">
      <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
        <h1 className="text-6xl text-center font-black">
          Surya Karya Mandiri <br /> Central Archive
        </h1>
        <h1 className="text-xl">Pusat pengarsipan data transaksi projek Surya Karya Mandiri</h1>
        <Button>Masuk</Button>
      </div>
    </main>
  );
}
