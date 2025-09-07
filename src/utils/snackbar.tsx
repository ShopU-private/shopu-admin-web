import { useEffect } from "react";

interface SnackbarProps {
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
  duration?: number;
}

export default function Snackbar({
  message,
  type = "success",
  onClose,
  duration = 3000,
}: SnackbarProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-yellow-600";

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 text-white rounded-lg shadow-lg ${bgColor} transition-all`}
    >
      {message}
    </div>
  );
}
