"use client";

import { deleteArticle } from "@/lib/articles";
import { Eraser, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function ArticleDeleteAction({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const ok = await deleteArticle(id);
    if (ok) {
      setIsLoading(false);
      window.alert("Successfully delete your article.");
      setOpen(false);
      router.refresh();
    } else {
      setIsLoading(false);
      window.alert("Failed");
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-1"
          onClick={() => setOpen(true)}
        >
          <Eraser size={20} />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete this article?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            article and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(id)}
            className="flex items-center gap-1"
          >
            {isLoading && <Loader2 size={20} className="animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
