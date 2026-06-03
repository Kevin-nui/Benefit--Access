import { motion } from "framer-motion";
import { cn } from "@/utils";

interface Props {
  current: number;
  total: number;
  onSegmentClick?: (segment: number) => void;
}

export function ProgressBar({ current, total, onSegmentClick }: Props) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const segment = i + 1;
        const filled = segment <= current;
        const isActive = segment === current;
        const clickable = segment !== current && onSegmentClick;

        return (
          <div
            key={i}
            role="button"
            tabIndex={clickable ? 0 : undefined}
            onClick={() => clickable && onSegmentClick(segment)}
            onKeyDown={(e) => {
              if (clickable && (e.key === "Enter" || e.key === " "))
                onSegmentClick(segment);
            }}
            className={cn(
              "relative h-2.5 flex-1 overflow-hidden rounded-full transition-opacity duration-150",
              filled ? "bg-progress-active" : "bg-progress-inactive",
              clickable && "cursor-pointer hover:opacity-80",
              isActive && "cursor-default",
            )}
          >
            {filled && (
              <motion.div
                className="absolute inset-0 rounded-full bg-progress-active"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
