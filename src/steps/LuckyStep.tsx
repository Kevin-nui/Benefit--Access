import { motion } from "framer-motion";
import { useWizard } from "@/context/wizard-context";
import { Button } from "@/ui";

export function LuckyStep() {
  const { goNext } = useWizard();

  return (
    <div className="flex flex-col gap-6 py-4 text-center  font-headingCustom">
      <motion.h2
        className=" font-headingCustom text-lg text-black"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Welcome back! Are you feeling lucky today?
      </motion.h2>

      {(["Yes", "No"] as const).map((label, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * (i + 1) }}
        >
          <Button
            fullWidth
            variant="secondary"
            onClick={goNext}
            type="button"
            className="font-inter text-md"
          >
            {label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
