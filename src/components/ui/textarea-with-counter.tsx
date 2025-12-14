import { forwardRef, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextareaWithCounterProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength: number;
  value?: string;
}

const TextareaWithCounter = forwardRef<HTMLTextAreaElement, TextareaWithCounterProps>(
  ({ className, maxLength, value = "", onChange, ...props }, ref) => {
    const [charCount, setCharCount] = useState(value?.length || 0);
    const isNearLimit = charCount >= maxLength * 0.8;
    const isAtLimit = charCount >= maxLength;

    useEffect(() => {
      setCharCount(value?.length || 0);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className="relative">
        <Textarea
          ref={ref}
          className={cn(className)}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            "absolute bottom-2 right-3 text-xs transition-colors",
            isAtLimit
              ? "text-destructive font-medium"
              : isNearLimit
              ? "text-amber-500"
              : "text-muted-foreground"
          )}
        >
          {charCount}/{maxLength}
        </div>
      </div>
    );
  }
);

TextareaWithCounter.displayName = "TextareaWithCounter";

export { TextareaWithCounter };
