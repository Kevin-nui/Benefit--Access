import { useWizard } from "@/context/wizard-context";
import { Button } from "@/components/atoms";
import { FormField } from "@/components/molecules/FormField";
import { PhoneInput } from "@/components/molecules/PhoneInput";

export function PhoneStep() {
  const { control, errors, watch, isLoading, goNext } = useWizard();
  const heading = `Last Step, ${watch("firstName") || "Friend"}!`;
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
          Thanks! Please confirm your number
        </p>
      </div>

      <FormField label="Phone Number" error={errors.phoneNumber?.message}>
        <PhoneInput control={control} hasError={!!errors.phoneNumber} />
      </FormField>

      <p className="font-body text-xs leading-relaxed text-[#666666]">
        By selecting &ldquo;Continue&rdquo;, I provide my ESIGN signature and
        express consent for GetnGoods, Unified Marketing Partners &amp; its{" "}
        <a href="#" className="text-brand-blue underline">
          Subsidiaries
        </a>
        , SnagnGoods, USMsg, MyJobMobile, OMG Sweeps, Best Day Ever Sweepstakes,
        FamilyRecoveryHub, Dollar-Sensei, CheckGo, Lendli, Benefitlink, Americas
        Health and Grant-Navigators to contact me at the phone number I provided
        for marketing and transactional messages, including personal finance,
        benefits &amp; sweepstakes, via text and calls, which may use automated,
        manual, prerecorded, or AI technology, until I revoke consent. This
        applies even if my number is on a &ldquo;Do Not Call&rdquo; list.
        Consent is not required to use this site.{" "}
        <a href="#" className="text-brand-blue underline">
          Click Here
        </a>{" "}
        to proceed without consent. I have read and agree to the{" "}
        <a href="#" className="text-brand-blue underline">
          Terms &amp; Conditions
        </a>
        , including mandatory arbitration, and for resolving disputes and TCPA
        claim.
      </p>

      <Button
        className="self-end"
        fullWidth
        isLoading={isLoading}
        type="submit"
        disabled={hasErrors}
        size="sm"
      >
        Submit
      </Button>
    </form>
  );
}
