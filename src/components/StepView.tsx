import { AnimatePresence, motion } from "framer-motion";
import { useWizard } from "@/context/wizard-context";
import { Stepper } from "./Stepper";
import { TrustBadges } from "./TrustBadges";

import { EmailStep } from "@/steps/EmailStep";
import { BasicsStep } from "@/steps/BasicsStep";
import { AddressStep } from "@/steps/AddressStep";
import { PhoneStep } from "@/steps/PhoneStep";
import { LuckyStep } from "@/steps/LuckyStep";
import { SuccessStep } from "@/steps/SuccessStep";

const STEPS = [
  { id: "email", Component: EmailStep, showStepper: false, progress: 1 },
  { id: "basics", Component: BasicsStep, showStepper: true, progress: 2 },
  { id: "address", Component: AddressStep, showStepper: true, progress: 3 },
  { id: "phone", Component: PhoneStep, showStepper: true, progress: 4 },
  { id: "lucky", Component: LuckyStep, showStepper: true, progress: 4 },
  { id: "success", Component: SuccessStep, showStepper: true, progress: 4 },
] as const;

// Maps progress segment (1-4) → the first step index with that progress value
const SEGMENT_TO_STEP_INDEX: Record<number, number> = {
  1: 0, // email
  2: 1, // basics
  3: 2, // address
  4: 3, // phone
};

export function StepView() {
  const { stepIndex, direction, goTo, goNext } = useWizard();
  const step = STEPS[stepIndex];
  const { Component } = step;

  function handleSegmentClick(segment: number) {
    const targetIndex = SEGMENT_TO_STEP_INDEX[segment];
    if (targetIndex < stepIndex) {
      goTo(targetIndex);
    } else if (segment > step.progress) {
      goNext();
    }
  }

  return (
    <div
      className={`patriotic-bg relative ${step.showStepper ? "pb-4 pt-4 md:pb-16 md:pt-6" : "pb-4 pt-5 md:pb-24 md:pt-8"}`}
    >
      {step.showStepper && (
        <div className="card-width relative z-10 mx-auto">
          <Stepper
            progress={step.progress}
            onSegmentClick={handleSegmentClick}
          />
        </div>
      )}

      <div
        className={`card-width  mx-auto ${step.showStepper ? "mt-3" : "mt-5 md:mt-8"}`}
      >
        <div className="card-pad rounded-2xl bg-white shadow-card">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: direction === "forward" ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "forward" ? -40 : 40 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              <Component />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-5">
        <TrustBadges />
      </div>
    </div>
  );
}
