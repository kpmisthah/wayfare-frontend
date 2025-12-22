import React, { useState } from "react";
import Modal from "@/shared/components/common/Modal";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Agency } from "../../types/agency.type";

interface ApprovalModalProps {
    isOpen: boolean;
    onClose: () => void;
    agency: Agency | null;
    action: "accept" | "reject";
    onConfirm: (agency: Agency, action: "accept" | "reject", reason?: string) => void | Promise<void>;
    loading?: boolean;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({
    isOpen,
    onClose,
    agency,
    action,
    onConfirm,
    loading = false,
}) => {
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const handleConfirm = () => {
        if (action === "reject") {
            if (!reason.trim()) {
                setError("Please provide a reason for rejection");
                return;
            }
            if (reason.trim().length < 10) {
                setError("Reason must be at least 10 characters long");
                return;
            }
        }

        if (agency) {
            onConfirm(agency, action, action === "reject" ? reason : undefined);
            // Don't close immediately - let the parent handle closing after the API call
            setReason("");
            setError("");
        }
    };

    const handleClose = () => {
        setReason("");
        setError("");
        onClose();
    };

    if (!agency) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={action === "accept" ? "Accept Agency Request" : "Reject Agency Request"}
            subtitle={`${agency.user.name} - ${agency.user.email}`}
            size="md"
        >
            <div className="space-y-4">
                {action === "accept" ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-green-900 mb-2">Confirm Acceptance</h4>
                                <p className="text-sm text-green-800">
                                    Are you sure you want to approve this agency request? The agency will be
                                    verified and granted full access to the platform.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <XCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-red-900 mb-2">Reject Request</h4>
                                    <p className="text-sm text-red-800">
                                        Please provide a clear reason for rejecting this agency application.
                                        This will be visible to the agency.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rejection Reason <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                value={reason}
                                onChange={(e) => {
                                    setReason(e.target.value);
                                    setError("");
                                }}
                                placeholder="Enter detailed rejection reason (minimum 10 characters)..."
                                rows={4}
                                className={`w-full ${error ? "border-red-500" : ""}`}
                            />
                            {error && (
                                <p className="text-sm text-red-600 mt-1">{error}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Agency Details Summary */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <h5 className="font-medium text-gray-900 mb-3">Agency Details</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="text-gray-600">Owner:</span>
                            <p className="font-medium">{agency.ownerName || "N/A"}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">License:</span>
                            <p className="font-medium">{agency.licenseNumber || "N/A"}</p>
                        </div>
                        <div className="col-span-2">
                            <span className="text-gray-600">Address:</span>
                            <p className="font-medium">{agency.address || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={loading}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={action === "accept" ? "default" : "destructive"}
                        onClick={handleConfirm}
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Processing...
                            </>
                        ) : action === "accept" ? (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Confirm Approval
                            </>
                        ) : (
                            <>
                                <XCircle className="w-4 h-4 mr-2" />
                                Confirm Rejection
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ApprovalModal;

