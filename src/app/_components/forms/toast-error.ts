import type { ExternalToast } from "sonner";

export const toastErrorConfig: ExternalToast = {
  style: {
    background: "hsl(var(--primary))",
    color: "hsl(var(--primary-contrast))",
  },
  position: "bottom-right",
  duration: 3000,
};
