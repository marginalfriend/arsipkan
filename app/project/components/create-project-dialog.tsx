import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CreateProjectForm } from "./create-project-form";

export function CreateProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Projek Baru</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Projek Baru</DialogTitle>
        </DialogHeader>

        <div className="h-[80vh] overflow-y-auto">
          <CreateProjectForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
