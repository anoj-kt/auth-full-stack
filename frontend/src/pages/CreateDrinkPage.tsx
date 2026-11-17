import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { createDrink } from '@/data/drinks';
import { createDrinkSchema } from '@/zod';
import { useAuth } from '@/context/AuthContext';

const CreateDrinkPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const { checkingSession } = useAuth();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const result = createDrinkSchema.safeParse({ name });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setPending(true);

    try {
      const drink = await createDrink(result.data);
      navigate('/drink/' + drink._id);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Der Drink konnte nicht angelegt werden.',
      );
    } finally {
      setPending(false);
    }
  };

  if (checkingSession) {
    return <p>Session wird überpruft</p>;
  }

  return (
    <section>
      <h1>Drink anlegen</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type='submit' disabled={pending}>
          {pending ? 'Bitte warten …' : 'Drink anlegen'}
        </button>
        {error && <p role='alert'>{error}</p>}
      </form>
    </section>
  );
};

export { CreateDrinkPage };
