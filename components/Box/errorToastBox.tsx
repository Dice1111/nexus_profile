import { Ban } from "lucide-react";
import { toast } from "sonner";

interface IDisplayErrorToast {
  message?: string;
  duration?: number;
}

export function displayErrorToast({
  message = "Operation Failed",
  duration = 1500,
}: IDisplayErrorToast) {
  return toast.custom(
    (t) => (
      <div
        className="flex items-center gap-3 px-4 py-3 border rounded-lg text-sm font-medium"
        style={{
          backgroundColor: "#fef2f2",
          color: "#b91c1c",
          borderColor: "#fca5a5",
        }}
      >
        <Ban size={20} color="#b91c1c" />
        <span>{message}</span>
      </div>
    ),
    {
      position: "top-right",
      duration,
    }
  );
}
