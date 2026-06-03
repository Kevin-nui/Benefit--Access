    import type {
      UseFormRegister,
      Control,
      FieldErrors,
      UseFormWatch,
      UseFormSetValue,
    } from 'react-hook-form';


    export interface FormData {
      email: string;
      firstName: string;
      lastName: string;
      dateOfBirth: { month: string; day: string; year: string };
      gender: string;
      zipCode: string;
      streetAddress: string;
      city: string;
      state: string;
      phoneNumber: string;
    }

    export const DEFAULT_FORM_DATA: FormData = {
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: { month: '', day: '', year: '' },
      gender: '',
      zipCode: '',
      streetAddress: '',
      city: '',
      state: '',
      phoneNumber: '',
    };


    export interface WizardCtx {
      stepIndex: number;
      direction: 'forward' | 'back';
      isLoading: boolean;
      goNext: () => Promise<void>;
      goBack: () => void;
      goTo:   (index: number) => void;
      register: UseFormRegister<FormData>;
      control: Control<FormData>;
      errors: FieldErrors<FormData>;
      watch: UseFormWatch<FormData>;
      setValue: UseFormSetValue<FormData>;
      gotoNextIfValid: () => Promise<void>;
      isValid: boolean;
    }