import { Agency } from "./agency.type";

export interface AgencyDetailModalProps {
  agency: Agency | null;
  isOpen: boolean;
  onClose: () => void;
  handleApprovalAgency?: (
    updatedAgency: Agency,
    action?: "accept" | "reject",
    reason?: string
  ) => void | Promise<void>;
}
