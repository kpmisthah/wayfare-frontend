import { CheckCircle, Shield } from "lucide-react";

const CancellationPolicy = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        Cancellation Policy
      </h2>
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
          <div>
            <p className="font-medium">Free Cancellation</p>
            <p>Cancel up to 7 days before the trip for a full refund</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-4 h-4 mt-0.5 text-yellow-500" />
          <div>
            <p className="font-medium">Partial Refund</p>
            <p>Cancel 4-7 days before: 50% refund of total amount</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-4 h-4 mt-0.5 text-red-500" />
          <div>
            <p className="font-medium">No Refund</p>
            <p>Cancel less than 4 days before: No refund available</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-xs">
            <strong>Note:</strong> Weather-related cancellations by the tour
            operator will receive a full refund or free rescheduling option.
          </p>
        </div>
      </div>
    </div>
  );
};
export default CancellationPolicy