import { CircleCheck } from "lucide-react";
import { toast } from "sonner";

interface IDisplaySuccessToast {
  message?: string;
  duration?: number;
}

export function displaySuccessToast({
  message = "Success",
  duration = 1500,
}: IDisplaySuccessToast) {
  return toast.custom(
    () => (
      <div
        className="flex items-center gap-3 px-4 py-3 border rounded-lg text-sm font-medium"
        style={{
          backgroundColor: "#ecfdf5",
          color: "#047857",
          borderColor: "#6ee7b7",
        }}
      >
        <CircleCheck size={20} color="#047857" />
        <span>{message}</span>
      </div>
    ),
    {
      position: "top-center",
      duration,
    }
  );
}
