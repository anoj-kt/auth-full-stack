import { z } from 'zod/v4';

const credentialsSchema = z.object({
  email: z.string().trim().pipe(z.email({ error: 'Gib eine gültige E-Mail-Adresse ein.' })),
  password: z.string()
    .min(8, { error: 'Das Passwort braucht mindestens 8 Zeichen.' })
    .refine((value) => new TextEncoder().encode(value).byteLength <= 72, {
      error: 'Das Passwort darf höchstens 72 UTF-8-Bytes lang sein.',
    }),
});

const accessTokenSchema = z.object({
  accessToken: z.string().min(1),
});

const userSchema = z.object({
  email: z.email(),
});

const drinkSchema = z.object({
  _id: z.string(),
  name: z.string(),
  onMenu: z.boolean(),
  ownerId: z.string().optional(),
});

const drinksSchema = z.array(drinkSchema);

const createDrinkSchema = z.object({
  name: z.string().trim().min(1, { error: 'Gib einen Namen für den Drink ein.' }),
});

export {
  credentialsSchema,
  accessTokenSchema,
  userSchema,
  drinkSchema,
  drinksSchema,
  createDrinkSchema,
};
