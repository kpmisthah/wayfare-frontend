import { Agency } from "./agency.type";

export interface BlockAgencyModalProps {
  isOpen: boolean;
  agency: Agency | null;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (updatedAgency: Agency) => void | Promise<void>;
}

export interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName?: string;
}

export interface EditAgencyDialogProps {
  agency: Agency | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (agency: Agency) => void;
  loading: boolean
}