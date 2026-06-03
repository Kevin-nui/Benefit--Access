import { useWizard } from "@/context/wizard-context";
import { Button, TextField, Select } from "@/ui";
import { FormField } from "@/components/FormField";
import { DateOfBirthInput } from "@/components/DateOfBirthInput";
import { GENDER_OPTIONS } from "@/constants";

export function BasicsStep() {
  const { register, control, errors, watch, isLoading, goNext } = useWizard();

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
          Welcome!
        </h2>
        <p className="mt-1 font-body text-base font-bold text-gray-custom">
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

      <Button fullWidth isLoading={isLoading} type="submit">
        CONTINUE
      </Button>
    </form>
  );
}
