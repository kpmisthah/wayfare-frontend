import { Building, FileText, Globe, MapPin, User } from "lucide-react";
import { AgencyStatus } from "../../types/agency.status.enum";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import Modal from "@/shared/components/common/Modal";
import { AgencyDetailModalProps } from "../../types/agency-detail.modal.type";

export const AgencyDetailModal:React.FC<AgencyDetailModalProps> = ({
  agency,
  isOpen,
  onClose,
  handleApprovalAgency,
}) => {
  if (!agency) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Agency Details"
      size="lg"
    >
      {/* Content */}
      <div className="space-y-6">
        {/* Contact & Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <User className="w-5 h-5 text-blue-600" />
              Contact Information
            </h3>
            <div className="space-y-2 text-sm">
              <p className="flex">
                <span className="font-medium text-gray-600 w-16">Name:</span>
                <span className="text-gray-900">{agency.user.name}</span>
              </p>
              <p className="flex">
                <span className="font-medium text-gray-600 w-16">Email:</span>
                <span className="text-gray-900">{agency.user.email}</span>
              </p>
              <p className="flex">
                <span className="font-medium text-gray-600 w-16">Phone:</span>
                <span className="text-gray-900">{agency.user.phone}</span>
              </p>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <Building className="w-5 h-5 text-green-600" />
              Company Information
            </h3>
            <div className="space-y-2 text-sm">
              <p className="flex">
                <span className="font-medium text-gray-600 w-20">Owner:</span>
                <span className="text-gray-900">{agency.ownerName}</span>
              </p>
              <p className="flex">
                <span className="font-medium text-gray-600 w-20">License:</span>
                <span className="text-gray-900">{agency.licenseNumber}</span>
              </p>
              <p className="flex items-center gap-1">
                <span className="font-medium text-gray-600 w-20">Website:</span>
                <a
                  href={agency.websiteUrl}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {agency.websiteUrl}
                </a>
                <Globe className="w-4 h-4 text-blue-500" />
              </p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <MapPin className="w-5 h-5 text-red-600" />
            Address
          </h3>
          <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
            {agency.address}
          </p>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <FileText className="w-5 h-5 text-purple-600" />
            Description
          </h3>
          <p className="text-gray-900 bg-gray-50 p-3 rounded-md leading-relaxed">
            {agency.description}
          </p>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Current Status</h3>
          <Badge
            variant={
              agency.status === AgencyStatus.ACTIVE
                ? "default"
                : agency.status === AgencyStatus.INACTIVE
                ? "destructive"
                : "outline"
            }
            className="text-sm px-3 py-1"
          >
            {agency.status === AgencyStatus.ACTIVE
              ? "Active"
              : agency.status === AgencyStatus.INACTIVE
              ? "Inactive"
              : "Pending Review"}
          </Badge>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="pt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>

        {agency.status === AgencyStatus.PENDING && (
          <>
            <Button
              variant="destructive"
              onClick={() =>
                handleApprovalAgency?.({
                  ...agency,
                  status: AgencyStatus.INACTIVE,
                })
              }
            >
              Reject
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() =>
                handleApprovalAgency?.({
                  ...agency,
                  status: AgencyStatus.ACTIVE,
                })
              }
            >
              Approve
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};
