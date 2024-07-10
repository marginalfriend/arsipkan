import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KwitansiForm } from "./kwitansi-form";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

export function CreateKwitansiDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Kwitansi Baru</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Kwitansi Baru</DialogTitle>
        </DialogHeader>

        <div className="h-[80vh] overflow-y-auto">
          <KwitansiForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
