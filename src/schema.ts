import { z } from 'zod/v3';

const emailSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Enter a valid email.'),
});

const basicsSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters.'),
  lastName:  z.string().min(1, 'Last name must be at least 2 characters.'),
  dateOfBirth: z.object({
    month: z.string().min(1, 'Month is required.'),
    day:   z.string().min(1, 'Day is required.'),
    year:  z.string().min(1, 'Year is required.'),
  }).superRefine((dob, ctx) => {
    const { month, day, year } = dob;
    if (!month || !day || !year) return;
    const birth = new Date(+year, +month - 1, +day);
    if (isNaN(birth.getTime())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid date.', path: ['day'] });
      return;
    }
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
    if (age < 18) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Must be 18 or older.', path: ['year'] });
  }),
  gender: z.string().min(1, 'Please select a gender.'),
});

const addressSchema = z.object({
  zipCode:       z.string().regex(/^\d{5}(-\d{4})?$/, 'Enter a valid ZIP code.'),
  streetAddress: z.string().min(4, 'Enter your full street address.'),
  city:          z.string().min(2, 'Enter a valid city.'),
  state:         z.string().min(1, 'Please select a state.'),
});

const phoneSchema = z.object({
  phoneNumber: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Enter a valid 10-digit phone number.'),
});

// Master schema used by React Hook Form
export const registrationSchema = z.object({
  ...emailSchema.shape,
  ...basicsSchema.shape,
  ...addressSchema.shape,
  ...phoneSchema.shape,
});
