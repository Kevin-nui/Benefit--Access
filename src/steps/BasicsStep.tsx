import { useWizard } from "@/context/wizard-context";
import { Button, TextField, Select } from "@/components/atoms";
import { FormField } from "@/components/molecules/FormField";
import { DateOfBirthInput } from "@/components/molecules/DateOfBirthInput";
import { GENDER_OPTIONS } from "@/constants";

export function BasicsStep() {
  const {
    register,
    control,
    errors,
    watch,
    isLoading,
    goNext,
    goBack,
    isValid,
    stepIndex,
  } = useWizard();

  const hasErrors = !!Object.keys(errors).length;

  console.log("si valid", isValid);
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
          Welcome!
        </p>
        <p className="  font-body text-base font-regular text-gray-custom">
          Now we just need the basics
        </p>
      </div>

      <FormField label="First Name" error={errors.firstName?.message}>
        <TextField
          {...register("firstName")}
          type="text"
          autoComplete="given-name"
          autoCapitalize="words"
          hasError={!!errors.firstName}
        />
      </FormField>

      <FormField label="Last Name" error={errors.lastName?.message}>
        <TextField
          {...register("lastName")}
          type="text"
          autoComplete="family-name"
          autoCapitalize="words"
          hasError={!!errors.lastName}
        />
      </FormField>

      <DateOfBirthInput control={control} errors={errors.dateOfBirth} />

      <FormField label="Gender" error={errors.gender?.message}>
        <Select
          {...register("gender")}
          options={GENDER_OPTIONS}
          value={watch("gender")}
          hasError={!!errors.gender}
        />
      </FormField>
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
