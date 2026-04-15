import React from "react";
import { t } from "../i18n";

interface AppErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || "Something went wrong.",
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("AppErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      errorMessage: "",
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
          <div className="w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-center shadow-xl">
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              {t("appCrashedTitle")}
            </h2>

            <p className="mt-3 text-sm text-[var(--muted)]">
              {this.state.errorMessage}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="rounded-full border border-[var(--border)] bg-white/5 px-4 py-2 text-sm text-[var(--foreground)] transition hover:bg-white/10"
              >
                {t("appCrashedRetry")}
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="rounded-full bg-sky-500 px-4 py-2 text-sm text-white transition hover:opacity-90"
              >
                {t("appCrashedReload")}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
