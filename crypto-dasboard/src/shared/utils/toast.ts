import toast from "react-hot-toast";

type ToastType = "success" | "error" | "info" | "loading";

const lastShownAtByKey = new Map<string, number>();

const TOAST_THROTTLE_MS = 2000;

const shouldSkipToast = (dedupeKey: string, durationMs: number) => {
  const now = Date.now();
  const lastShownAt = lastShownAtByKey.get(dedupeKey) ?? 0;

  if (now - lastShownAt < durationMs) {
    return true;
  }

  lastShownAtByKey.set(dedupeKey, now);
  return false;
};

interface ShowToastOptions {
  dedupeKey?: string;
  throttleMs?: number;
}

export const showToast = (
  message: string,
  type: ToastType = "info",
  options?: ShowToastOptions,
): string | undefined => {
  const dedupeKey = options?.dedupeKey;
  const throttleMs = options?.throttleMs ?? TOAST_THROTTLE_MS;

  if (type !== "loading" && dedupeKey && shouldSkipToast(dedupeKey, throttleMs)) {
    return undefined;
  }

  switch (type) {
    case "success":
      return toast.success(message);
    case "error":
      return toast.error(message);
    case "loading":
      return toast.loading(message);
    case "info":
    default:
      return toast(message);
  }
};

export const showSuccess = (
  message: string,
  options?: ShowToastOptions,
) => {
  return showToast(message, "success", options);
};

export const showError = (
  message: string,
  options?: ShowToastOptions,
) => {
  return showToast(message, "error", options);
};

export const showInfo = (
  message: string,
  options?: ShowToastOptions,
) => {
  return showToast(message, "info", options);
};

export const showLoading = (message: string) => {
  return showToast(message, "loading");
};

export const dismissToast = (toastId?: string) => {
  if (toastId) {
    toast.dismiss(toastId);
    return;
  }

  toast.dismiss();
};

export const clearToastDedupe = (dedupeKey?: string) => {
  if (dedupeKey) {
    lastShownAtByKey.delete(dedupeKey);
    return;
  }

  lastShownAtByKey.clear();
};