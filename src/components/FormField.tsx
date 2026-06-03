import { useId, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  label: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, error, children }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-body text-sm font-bold uppercase tracking-wider text-gray-custom"
      >
        {label}
      </label>

      <div id={id} className="[&>*]:w-full">
        {children}
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
