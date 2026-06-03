import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Select } from "@/ui";
import { MONTHS, DAYS, YEARS } from "@/constants";
import type { FormData } from "@/types";

interface Props {
  control: Control<FormData>;
  errors?: FieldErrors<FormData["dateOfBirth"]>;
}

const DOB_OPTIONS = [MONTHS, DAYS, YEARS] as {
  value: string;
  label: string;
}[][];

export function DateOfBirthInput({ control, errors }: Props) {
  const err =
    errors?.month?.message || errors?.day?.message || errors?.year?.message;
  return (
    <div className="flex flex-col gap-1">
      <span className="font-body text-sm font-regular  tracking-wider text-gray-custom">
        Date of Birth
      </span>
      <div
        className="grid grid-cols-3 gap-2"
        role="group"
        aria-label="Date of birth"
      >
        {(["month", "day", "year"] as const).map((field, i) => (
          <Controller
            key={field}
            control={control}
            name={`dateOfBirth.${field}`}
            render={({ field: f }) => (
              <Select
                {...f}
                options={DOB_OPTIONS[i]}
                aria-label={`Birth ${field}`}
                hasError={!!errors?.[field]}
              />
            )}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {err && (
          <motion.p
            key={err}
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-red-600"
          >
            {err}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
