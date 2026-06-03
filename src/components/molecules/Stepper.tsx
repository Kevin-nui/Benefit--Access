import { ProgressBar } from "./ProgressBar";

interface StepperProps {
  progress: number;
  total?: number;
  onSegmentClick?: (segment: number) => void;
}

export function Stepper({ progress, total = 4, onSegmentClick }: StepperProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white pb-5 pt-5 shadow-card">
      <div className="flex justify-center">
        <img
          src="/assets/logo.svg"
          alt="Benefits Access Center"
          className="h-8 w-auto md:h-10"
        />
      </div>

      <div className="mt-5 px-6 md:mx-auto md:w-full md:max-w-stepper-width">
        <ProgressBar
          current={progress}
          total={total}
          onSegmentClick={onSegmentClick}
        />
      </div>
    </div>
  );
}
