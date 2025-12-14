import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const PhoneInputComponent = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, placeholder, className, disabled }, ref) => {
    return (
      <PhoneInput
        international
        defaultCountry="AO"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "[&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-base [&_.PhoneInputInput]:flex-1",
          "[&_.PhoneInputCountry]:mr-2",
          "[&_.PhoneInputCountryIcon]:w-6 [&_.PhoneInputCountryIcon]:h-4",
          "[&_.PhoneInputCountrySelectArrow]:ml-1",
          className
        )}
        inputRef={ref}
      />
    );
  }
);

PhoneInputComponent.displayName = "PhoneInput";

export { PhoneInputComponent as PhoneInput };
