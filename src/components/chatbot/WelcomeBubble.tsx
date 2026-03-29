import { Sparkles, X } from "lucide-react";

interface WelcomeBubbleProps {
  isVisible: boolean;
  onOpen: () => void;
  onDismiss: () => void;
}

const WelcomeBubble = ({ isVisible, onOpen, onDismiss }: WelcomeBubbleProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-24 right-4 z-40 max-w-xs animate-bounce-in cursor-pointer md:right-8"
      onClick={onOpen}
    >
      <div className="relative rounded-lg border border-border bg-card p-4 shadow-lg">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted hover:bg-muted/80"
        >
          <X className="h-3 w-3" />
        </button>
        <div className="flex items-start gap-2">
          <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
          <p className="text-sm text-foreground">
            <strong>Olá!</strong> Precisa de ajuda sobre estudar nos EUA? Clique aqui para
            conversar!
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-8 translate-y-full transform">
        <div className="h-0 w-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-card" />
      </div>
    </div>
  );
};

export default WelcomeBubble;
