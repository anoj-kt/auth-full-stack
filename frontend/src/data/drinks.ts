import { drinkSchema, drinksSchema } from '@/zod';
import type { DrinkInput } from '@/types';

const DRINKS_API_URL = import.meta.env.VITE_DRINKS_API_URL;

if (!DRINKS_API_URL) {
  throw new Error('Drinks API URL is required. Check your .env file.');
}

const getDrinks = async () => {
  const response = await fetch(DRINKS_API_URL);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || 'Die Drinks konnten nicht geladen werden.',
    );
  }

  const data = await response.json();
  return drinksSchema.parse(data);
};

const getDrink = async (id: string) => {
  const response = await fetch(DRINKS_API_URL + '/' + id);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || 'Der Drink konnte nicht geladen werden.',
    );
  }

  const data = await response.json();
  return drinkSchema.parse(data);
};

const createDrink = async (formData: DrinkInput) => {
  const response = await fetch(DRINKS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || 'Der Drink konnte nicht angelegt werden.',
    );
  }

  const data = await response.json();
  return drinkSchema.parse(data);
};

export { getDrinks, getDrink, createDrink };
