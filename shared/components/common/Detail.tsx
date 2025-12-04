import { ReactNode } from "react";

type DetailProps = {
  label: string;
  value?: string | number | ReactNode;
  className?: string;
};
const Detail = ({ label, value, className = "" }: DetailProps) => (
  <div className={className}>
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="font-semibold text-gray-800">
      {value !== undefined && value !== null ? value : "-"}
    </p>
  </div>
);

export default Detail