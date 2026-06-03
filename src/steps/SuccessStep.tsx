import { useEffect } from "react";
import { motion } from "framer-motion";
import { useWizard } from "@/context/wizard-context";
import { SESSION_KEY } from "@/constants";

export function SuccessStep() {
  const { watch } = useWizard();
  const heading = `You're All Set, ${watch("firstName") || "Friend"}!`;

  useEffect(() => {
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-progress-active"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-10 w-10"
          aria-hidden="true"
        >
          <motion.path
            d="M5 13L9 17L19 7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className=" font-body text-lg font-bold text-heading-custom">
          {heading}
        </h2>
        <p className="font-body text-base text-slate-600">
          Your free Benefits Access Guide is on its way.
        </p>
        <p className="font-body text-sm text-slate-400">
          Check your inbox — we&apos;ll be in touch shortly.
        </p>
      </motion.div>
    </div>
  );
}
