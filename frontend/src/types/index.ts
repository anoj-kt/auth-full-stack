import type { z } from 'zod/v4';
import type { credentialsSchema, userSchema, drinkSchema, createDrinkSchema } from '@/zod';

type Credentials = z.infer<typeof credentialsSchema>;
type User = z.infer<typeof userSchema>;
type Drink = z.infer<typeof drinkSchema>;
type DrinkInput = z.infer<typeof createDrinkSchema>;

export type { Credentials, User, Drink, DrinkInput };
