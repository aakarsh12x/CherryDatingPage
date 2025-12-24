import { z } from 'zod';

// Onboarding validation schemas
export const nameSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
});

export const birthdaySchema = z.object({
  dateOfBirth: z.string().refine((date) => {
    const dob = new Date(date);
    const age = new Date().getFullYear() - dob.getFullYear();
    return age >= 18 && age <= 100;
  }, 'You must be at least 18 years old'),
});

export const genderSchema = z.object({
  gender: z.enum(['MAN', 'WOMAN', 'NON_BINARY', 'OTHER']),
});

export const interestedInSchema = z.object({
  interestedIn: z.enum(['MEN', 'WOMEN', 'EVERYONE']),
});

export const heightSchema = z.object({
  height: z.number().min(120, 'Height must be at least 120cm').max(250, 'Height must be at most 250cm'),
});

export const locationSchema = z.object({
  city: z.string().min(1, 'City is required'),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export const photosSchema = z.object({
  photoUrl: z.string().url('Invalid photo URL'),
  photoOrder: z.number().min(0).max(8),
  isPrimary: z.boolean().optional(),
});

export const interestsSchema = z.object({
  interests: z.array(z.string()).min(1, 'Select at least one interest').max(5, 'Maximum 5 interests'),
});

export const workEducationSchema = z.object({
  occupation: z.string().optional(),
  company: z.string().optional(),
  education: z.string().optional(),
});

export const promptsSchema = z.object({
  prompts: z.array(
    z.object({
      promptId: z.string(),
      answer: z.string().min(1, 'Answer is required').max(300),
      displayOrder: z.number(),
    })
  ).min(1).max(3),
});

export const bioSchema = z.object({
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(500, 'Bio must be at most 500 characters'),
});

export const lifestyleSchema = z.object({
  drinking: z.enum(['NEVER', 'SOCIALLY', 'REGULARLY']).optional(),
  smoking: z.enum(['NEVER', 'SOCIALLY', 'REGULARLY']).optional(),
  exercise: z.enum(['NEVER', 'SOMETIMES', 'OFTEN', 'DAILY']).optional(),
  pets: z.array(z.string()).optional(),
  dietaryPreference: z.string().optional(),
});

export const relationshipGoalSchema = z.object({
  relationshipGoal: z.enum(['LONG_TERM', 'SHORT_TERM', 'FRIENDSHIP', 'FIGURING_OUT']),
});
