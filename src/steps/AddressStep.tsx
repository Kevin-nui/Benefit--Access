import { useWizard } from "@/context/wizard-context";
import { Button, TextField, Select } from "@/components/atoms";
import { FormField } from "@/components/molecules/FormField";
import { US_STATES } from "@/constants";

export function AddressStep() {
  const { register, errors, watch, isLoading, goNext, goBack, stepIndex } =
    useWizard();
  const heading = `Keep Going, ${watch("firstName") || "Friend"}!`;
  const hasErrors = !!Object.keys(errors).length;
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        goNext();
      }}
    >
      <div>
        <p className=" font-body text-xl font-bold text-heading-custom">
          {heading}
        </p>
        <p className="  font-body text-base font-regular text-gray-custom">
          Confirm Your Address To Qualify
        </p>
      </div>

      <FormField
        label="ZIP Code"
        error={errors.zipCode?.message}
        name="zipCode"
      >
        <TextField
          {...register("zipCode")}
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={10}
          hasError={!!errors.zipCode}
        />
      </FormField>

      <FormField
        label="Address"
        error={errors.streetAddress?.message}
        name="streetAddress"
      >
        <TextField
          {...register("streetAddress")}
          type="text"
          autoComplete="street-address"
          hasError={!!errors.streetAddress}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="City" error={errors.city?.message} name="city">
          <TextField
            {...register("city")}
            type="text"
            autoComplete="address-level2"
            hasError={!!errors.city}
          />
        </FormField>
        <FormField label="State" error={errors.state?.message} name="state">
          <Select
            {...register("state")}
            options={US_STATES as { value: string; label: string }[]}
            value={watch("state")}
            hasError={!!errors.state}
          />
        </FormField>
      </div>
      <div className="flex justify-between">
        <Button
          className="self-start"
          fullWidth
          variant="previous"
          isLoading={isLoading}
          type="submit"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("goBack called", stepIndex);
            goBack();
          }}
        >
          Previous
        </Button>

        <Button
          className="self-end"
          fullWidth
          isLoading={isLoading}
          type="submit"
          disabled={hasErrors}
          size="sm"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
