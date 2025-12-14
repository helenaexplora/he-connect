import { forwardRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputWithCounterProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  maxLength: number;
  value?: string;
}

const InputWithCounter = forwardRef<HTMLInputElement, InputWithCounterProps>(
  ({ className, maxLength, value = "", onChange, ...props }, ref) => {
    const [charCount, setCharCount] = useState(value?.length || 0);
    const isNearLimit = charCount >= maxLength * 0.8;
    const isAtLimit = charCount >= maxLength;

    useEffect(() => {
      setCharCount(value?.length || 0);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          className={cn("pr-16", className)}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-3 text-xs transition-colors pointer-events-none",
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

InputWithCounter.displayName = "InputWithCounter";

export { InputWithCounter };
