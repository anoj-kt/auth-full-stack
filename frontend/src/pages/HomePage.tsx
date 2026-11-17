import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getDrinks } from '@/data/drinks';
import type { Drink } from '@/types';

const HomePage = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDrinks = async () => {
      try {
        const data = await getDrinks();
        setDrinks(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Die Drinks konnten nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    };

    loadDrinks();
  }, []);

  return (
    <section>
      <h1>Drinks</h1>
      {loading && <p role='status'>Drinks werden geladen …</p>}
      {error && <p role='alert'>{error}</p>}
      {!loading && !error && drinks.length === 0 && <p>Es gibt noch keine Drinks.</p>}
      <ul>
        {drinks.map((drink) => (
          <li key={drink._id}>
            <Link to={'/drink/' + drink._id}>{drink.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { HomePage };
