import { useWizard } from "@/context/wizard-context";
import { Button, TextField } from "@/components/atoms";
import { FormField } from "@/components/molecules/FormField";

export function EmailStep() {
  const { register, errors, isLoading, goNext } = useWizard();
  const hasErrors = !!Object.keys(errors).length;
  console.log("has errors", hasErrors, errors);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        goNext();
      }}
    >
      <div className="relative flex items-start justify-between">
        <div className="flex flex-col">
          <h1 className="font-heading text-4xl font-normal leading-tight text-heading-custom">
            Find Your
          </h1>
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-heading-custom">
            Unclaimed Money
          </h1>
        </div>

        <img
          src="/assets/money-hero.png"
          alt="Cash pile"
          className="h-28 w-auto -mt-2 md:h-36"
          loading="eager"
        />
      </div>

      {/* Subtitle */}
      <p className="max-w-sm font-body text-sm text-gray-custom">
        Get your free, made-for-you guide to unclaimed money, savings, and cash
        opportunities
      </p>

      {/* Email field */}
      <FormField label="Email" error={errors.email?.message}>
        <TextField
          {...register("email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          hasError={!!errors.email}
        />
      </FormField>

      {/* Button aligned right */}
      <div className="flex justify-end">
        <Button
          className="self-end"
          fullWidth
          isLoading={isLoading}
          type="submit"
          disabled={hasErrors}
          size="sm"
        >
          Get My Guide
        </Button>
      </div>
    </form>
  );
}
