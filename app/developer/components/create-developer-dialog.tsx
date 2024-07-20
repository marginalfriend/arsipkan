import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CreateDeveloperForm } from "./create-developer-form";

export function CreateDeveloperDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Developer Baru</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-2xl">
            Buat Projek Baru
          </DialogTitle>
        </DialogHeader>

        <div className="h-[80vh] overflow-y-auto">
          <CreateDeveloperForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
