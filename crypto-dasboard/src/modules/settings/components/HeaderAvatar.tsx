import type { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { appStore } from "../../../app/store/app.store";
import { setAvatar } from "../../../app/actions/settings.actions";
import { t } from "../../../shared/i18n";
import { showError, showSuccess } from "../../../shared/utils/toast";

const MAX_FILE_SIZE_MB = 2;

export const HeaderAvatar = observer(() => {
  const store = appStore();
  const avatar = store.settings.avatar;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError(t("avatarInvalidType"));
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      showError(t("avatarTooLarge"));
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        showError(t("avatarReadFailed"));
        event.target.value = "";
        return;
      }

      setAvatar(result);
      showSuccess(t("avatarUpdated"));
      event.target.value = "";
    };

    reader.onerror = () => {
      showError(t("avatarReadFailed"));
      event.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    showSuccess(t("avatarRemoved"));
  };

  return (
    <div className="flex items-center gap-3">
      <label className="group cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {avatar ? (
          <div className="relative">
            <img
              src={avatar}
              alt="User avatar"
              className="h-10 w-10 rounded-full border border-[var(--border)] object-cover transition group-hover:opacity-85"
            />
            <div className="pointer-events-none absolute inset-0 hidden items-center justify-center rounded-full bg-black/30 text-[10px] text-white group-hover:flex">
              Edit
            </div>
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--muted)] transition group-hover:bg-white/10">
            👤
          </div>
        )}
      </label>

      <div className="hidden sm:block">
        <div className="text-sm font-medium text-[var(--foreground)]">
          Crypto User
        </div>
        <div className="text-xs text-[var(--muted)]">{t("avatar")}</div>
      </div>

      <label className="cursor-pointer rounded-full bg-sky-500 px-4 py-2 text-sm text-white transition hover:opacity-90">
        {t("uploadAvatar")}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {avatar ? (
        <button
          type="button"
          onClick={handleRemoveAvatar}
          className="hidden rounded-full border border-[var(--border)] bg-white/5 px-3 py-2 text-sm text-[var(--foreground)] transition hover:bg-white/10 md:inline-flex"
        >
          {t("removeAvatar")}
        </button>
      ) : null}
    </div>
  );
});
