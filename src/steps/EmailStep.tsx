import { useWizard } from "@/context/wizard-context";
import { Button, TextField } from "@/ui";
import { FormField } from "@/components/FormField";

export function EmailStep() {
  const { register, errors, isLoading, goNext } = useWizard();

  return (
    <form
      className="flex flex-col items-center gap-4 md:gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        goNext();
      }}
    >
      <h1 className="text-center font-heading text-[28px] font-extrabold leading-tight text-heading-custom md:text-4xl">
        Find Your Unclaimed Money
      </h1>

      <img
        src="/assets/money-hero.png"
        alt="Cash pile"
        className="h-36 w-auto md:h-52"
        loading="eager"
      />

      <p className="max-w-md text-center font-body text-sm font-bold leading-snug text-gray-custom">
        Get your free, made-for-you guide to unclaimed money, savings, and cash
        opportunities
      </p>

      <div className="w-full max-w-lg">
        <FormField label="Email" error={errors.email?.message}>
          <TextField
            {...register("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            hasError={!!errors.email}
          />
        </FormField>
      </div>

      <div className="mt-2 w-full max-w-lg md:mt-4">
        <Button fullWidth isLoading={isLoading} type="submit">
          GET MY GUIDE
        </Button>
      </div>
    </form>
  );
}
