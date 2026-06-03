import { useWizard } from "@/context/wizard-context";
import { Button, TextField, Select } from "@/ui";
import { FormField } from "@/components/FormField";
import { US_STATES } from "@/constants";

export function AddressStep() {
  const { register, errors, watch, isLoading, goNext } = useWizard();
  const heading = `Keep Going, ${watch("firstName") || "Friend"}!`;

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        goNext();
      }}
    >
      <div className="text-center">
        <h2 className="font-heading text-lg font-bold text-heading-custom">
          {heading}
        </h2>
        <p className="mt-1 font-body text-base font-bold text-gray-custom">
          Confirm your address to qualify
        </p>
      </div>

      <FormField label="ZIP Code" error={errors.zipCode?.message}>
        <TextField
          {...register("zipCode")}
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={10}
          hasError={!!errors.zipCode}
        />
      </FormField>

      <FormField label="Address" error={errors.streetAddress?.message}>
        <TextField
          {...register("streetAddress")}
          type="text"
          autoComplete="street-address"
          hasError={!!errors.streetAddress}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="City" error={errors.city?.message}>
          <TextField
            {...register("city")}
            type="text"
            autoComplete="address-level2"
            hasError={!!errors.city}
          />
        </FormField>
        <FormField label="State" error={errors.state?.message}>
          <Select
            {...register("state")}
            options={US_STATES as { value: string; label: string }[]}
            value={watch("state")}
            hasError={!!errors.state}
          />
        </FormField>
      </div>

      <Button fullWidth isLoading={isLoading} type="submit">
        CONTINUE
      </Button>
    </form>
  );
}
