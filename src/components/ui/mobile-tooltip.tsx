import * as React from "react";
import { HelpCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileTooltipProps {
  content: string;
  className?: string;
}

/**
 * A tooltip component that works on both desktop (hover) and mobile (click).
 * On mobile, it uses a Popover for tap-to-open functionality.
 * On desktop, it uses a standard Tooltip for hover functionality.
 */
export const MobileTooltip = ({ content, className = "" }: MobileTooltipProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  if (isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          type="button"
          className={`ml-2 text-muted-foreground hover:text-primary active:text-primary transition-colors p-1 -m-1 touch-manipulation ${className}`}
          aria-label="Mostrar mais informações"
        >
          <HelpCircle className="w-5 h-5" />
        </PopoverTrigger>
        <PopoverContent 
          className="max-w-[280px] text-sm p-4 bg-card border-border shadow-lg z-50"
          side="top"
          align="center"
          sideOffset={8}
        >
          <p className="text-foreground leading-relaxed">{content}</p>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          className={`ml-2 text-muted-foreground hover:text-primary transition-colors ${className}`}
          aria-label="Mostrar mais informações"
        >
          <HelpCircle className="w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-sm z-50">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
