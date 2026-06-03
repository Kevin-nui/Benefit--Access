import { Controller, type Control } from "react-hook-form";
import { formatPhone } from "@/utils";
import { TextField } from "@/ui";
import type { FormData } from "@/types";

interface Props {
  control: Control<FormData>;
  hasError?: boolean;
}

export function PhoneInput({ control, hasError }: Props) {
  return (
    <Controller
      control={control}
      name="phoneNumber"
      render={({ field: { onChange, value, ...rest } }) => (
        <TextField
          {...rest}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={value}
          maxLength={14}
          hasError={hasError}
          onChange={(e) => onChange(formatPhone(e.target.value))}
        />
      )}
    />
  );
}
