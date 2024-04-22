import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { create } from "zustand";

type ConfirmDialogStore = {
  title: string;
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  openDialog: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
  ) => void;
  closeDialog: () => void;
  onOpenChange: (open: boolean) => void;
};

export const useConfirmDialog = create<ConfirmDialogStore>()((set) => ({
  title: "",
  message: "",
  isOpen: false,
  onConfirm: () => {},
  onCancel: () => {},
  openDialog: (title, message, onConfirm, onCancel) =>
    set({ title, message, onConfirm, onCancel, isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  onOpenChange: (open) => set({ isOpen: open }),
}));

export function ConfirmDialog() {
  const { title, message, isOpen, onConfirm, onCancel, onOpenChange } =
    useConfirmDialog((state) => state);

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              onCancel?.();
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
