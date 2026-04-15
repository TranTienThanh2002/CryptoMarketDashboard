import { t } from "../i18n";

interface ConnectionBadgeProps {
  status: "connecting" | "live" | "reconnecting" | "disconnected" | "idle";
}

export const ConnectionBadge = ({ status } : ConnectionBadgeProps) => {
  const statusMap = {
    idle: {
      label: t("connectionIdle"),
      className: "border-[var(--border)] bg-white/5 text-[var(--foreground)]",
    },
    connecting: {
      label: t("connectionConnecting"),
      className: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    },
    live: {
      label: t("connectionLive"),
      className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    },
    reconnecting: {
      label: t("connectionReconnecting"),
      className: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
    },
    disconnected: {
      label: t("connectionDisconnected"),
      className: "border-red-400/20 bg-red-400/10 text-red-300",
    },
  };

  const config = statusMap[status];

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs ${config.className}`}
    >
      {config.label}
    </span>
  );
};
