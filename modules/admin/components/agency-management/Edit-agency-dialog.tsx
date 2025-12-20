// components/EditAgencyDialog.tsx
import { useEffect, useState } from "react";
import { Agency } from "../../types/agency.type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { AgencyStatus } from "../../types/agency.status.enum";
import { EditAgencyDialogProps } from "../../types/modal.type";



export const EditAgencyDialog = ({
  agency,
  isOpen,
  onOpenChange,
  onSave,
  loading
}: EditAgencyDialogProps) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    status: AgencyStatus;
  }>({
    name: "",
    email: "",
    status: AgencyStatus.PENDING,
  });

  useEffect(() => {
    if (agency) {
      setFormData({
        name: agency.user?.name || "",
        email: agency.user?.email || "",
        status: agency.status,
      });
    }
  }, [agency]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (agency && formData.name && formData.email) {
      onSave({
        ...agency,
        user: {
          ...agency.user,
          name: formData.name,
          email: formData.email,
        },
        status: formData.status,
      });
    }
  };
  if (!agency) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Agency</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Agency Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter agency name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={
                formData.status ? AgencyStatus.INACTIVE : AgencyStatus.ACTIVE
              }
              onValueChange={(value) =>
                handleChange("status", value === "inactive")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex items-center space-x-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};