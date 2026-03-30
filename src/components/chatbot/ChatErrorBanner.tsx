import { AlertCircle } from "lucide-react";

interface ChatErrorBannerProps {
  error: string | null;
  onDismissError: () => void;
}

const ChatErrorBanner = ({
  error,
  onDismissError,
}: ChatErrorBannerProps) => {
  if (!error) {
    return null;
  }

  return (
    <div
      className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <div className="flex-1">
        <p>{error}</p>
        <button
          type="button"
          onClick={onDismissError}
          className="mt-2 text-xs underline underline-offset-2"
        >
          Fechar aviso
        </button>
      </div>
    </div>
  );
};

export default ChatErrorBanner;
