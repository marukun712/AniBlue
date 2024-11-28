import { Status } from "@types";
import { Button } from "../../ui/button";

type StatusButtonProps = {
  icon: React.ReactNode;
  label: string;
  status: Status;
  isActive: boolean;
  onClick: () => void;
};

export default function StatusButton({
  icon,
  label,
  isActive,
  onClick,
}: StatusButtonProps) {
  return (
    <Button
      variant="outline"
      className={`flex items-center space-x-2 ${
        isActive ? "bg-green-500" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}
