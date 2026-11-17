import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getDrink } from '@/data/drinks';
import type { Drink } from '@/types';

const DrinkPage = () => {
  const { id } = useParams();
  const [drink, setDrink] = useState<Drink | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const loadDrink = async () => {
      try {
        const data = await getDrink(id);
        setDrink(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Der Drink konnte nicht geladen werden.');
      }
    };

    loadDrink();
  }, [id]);

  return (
    <section>
      {error && <p role='alert'>{error}</p>}
      {!drink && !error && <p role='status'>Drink wird geladen …</p>}
      {drink && <h1>{drink.name}</h1>}
      <Link to='/'>Zur Drink-Liste</Link>
    </section>
  );
};

export { DrinkPage };
