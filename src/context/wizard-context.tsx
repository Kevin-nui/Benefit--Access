import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "@/schema";
import { DEFAULT_FORM_DATA, type FormData, type WizardCtx } from "@/types";
import { SESSION_KEY } from "@/constants";

const STEP_IDS = [
  "email",
  "basics",
  "address",
  "phone",
  "lucky",
  "success",
] as const;

const VALIDATION: Record<string, string[]> = {
  email: ["email"],
  basics: [
    "firstName",
    "lastName",
    "dateOfBirth.month",
    "dateOfBirth.day",
    "dateOfBirth.year",
    "gender",
  ],
  address: ["zipCode", "streetAddress", "city", "state"],
  phone: ["phoneNumber"],
  lucky: [],
  success: [],
};

const Ctx = createContext<WizardCtx | null>(null);

function loadSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "");
  } catch {
    return null;
  }
}

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const saved = loadSession();

  const [stepIndex, setStepIndex] = useState<number>(saved?.step ?? 0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData, object, FormData>({
    resolver: zodResolver(registrationSchema) as Resolver<FormData, object>,
    mode: "onTouched",
    defaultValues: saved?.data ?? DEFAULT_FORM_DATA,
  });
  const {
    register,
    control,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
  } = form;

  console.log("is valid", isValid);

  // Persist to sessionStorage on every change
  useEffect(() => {
    const sub = form.watch((data) => {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ data, step: stepIndex }),
      );
    });
    return () => sub.unsubscribe();
  }, [form, stepIndex]);

  /** Validate the current step's fields, then advance if all pass. */
  const validateAndAdvance = useCallback(async (): Promise<boolean> => {
    const id = STEP_IDS[stepIndex];
    const fields = VALIDATION[id] ?? [];
    if (!fields.length) return true;
    setIsLoading(true);
    const ok = await trigger(fields as Parameters<typeof trigger>[0]);
    setIsLoading(false);
    return ok;
  }, [stepIndex, trigger]);

  const goNext = useCallback(async () => {
    const ok = await validateAndAdvance();
    if (!ok) return;
    setDirection("forward");
    setStepIndex((i) => Math.min(i + 1, STEP_IDS.length - 1));
  }, [validateAndAdvance]);

  /** Alias for goNext — satisfies the WizardCtx interface. */
  const gotoNextIfValid = goNext;

  const goBack = useCallback(() => {
    setDirection("back");
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  /** Jump directly to any step by index (no validation). */
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, STEP_IDS.length - 1));
      setDirection(clamped > stepIndex ? "forward" : "back");
      setStepIndex(clamped);
    },
    [stepIndex],
  );

  return (
    <Ctx.Provider
      value={{
        stepIndex,
        direction,
        isLoading,
        goNext,
        goBack,
        goTo,
        gotoNextIfValid,
        register,
        control,
        errors,
        watch,
        setValue,
        isValid,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWizard must be used inside <WizardProvider>");
  return ctx;
}
