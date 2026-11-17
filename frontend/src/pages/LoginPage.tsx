import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import { credentialsSchema } from '@/zod';

const LoginPage = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const result = credentialsSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setPending(true);

    try {
      await signIn(result.data);
      navigate('/');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Die Anmeldung ist fehlgeschlagen.',
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <section>
      <h1>Anmelden</h1>
      <form onSubmit={handleSubmit} noValidate>
        <p>
          <label htmlFor='email'>E-Mail-Adresse</label>
          <input
            id='email'
            type='email'
            autoComplete='email'
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </p>
        <p>
          <label htmlFor='password'>Passwort</label>
          <input
            id='password'
            type='password'
            autoComplete='current-password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
        <button type='submit' disabled={pending}>
          {pending ? 'Bitte warten …' : 'Anmelden'}
        </button>
        {error && <p role='alert'>{error}</p>}
      </form>
    </section>
  );
};

export { LoginPage };
