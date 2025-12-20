import { Button } from "@/shared/components/ui/button";
import Modal from "@/shared/components/common/Modal";
import { BlockAgencyModalProps } from "../../types/modal.type";
import { Loader2, CheckCircle, XCircle } from "lucide-react";



const BlockAgencyModal: React.FC<BlockAgencyModalProps> = ({
  isOpen,
  agency,
  loading,
  onClose,
  onConfirm,
}) => {
  if (!agency) return null;

  const isBlocked = agency.user.isBlock;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isBlocked ? "Activate Agency" : "Deactivate Agency"}
      size="sm"
    >
      <p className="mt-2 text-sm text-gray-600">
        Are you sure you want to{" "}
        <strong>{isBlocked ? "activate" : "deactivate"}</strong> this agency?
      </p>

      <div className="mt-4 flex items-center gap-3">
        <strong className="text-sm">{agency.user.name}</strong>
        <span className="text-xs text-gray-500">
          ({agency.user.email})
        </span>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant={isBlocked ? "default" : "destructive"}
          size="sm"
          disabled={loading}
          onClick={() =>
            onConfirm({
              ...agency,
              user: {
                ...agency.user,
                isBlock: !isBlocked,
              },
            })
          }
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : isBlocked ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Yes, Activate
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 mr-2" />
              Yes, Deactivate
            </>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default BlockAgencyModal;

