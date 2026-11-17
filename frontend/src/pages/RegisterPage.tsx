import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { credentialsSchema } from '@/zod';
import { register } from '@/data/auth';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    try {
      await register(result.data);
      navigate('/login');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Die Registierung ist fehlgeschlagen',
      );
    }
  };

  return (
    <section>
      <h1>Registrieren</h1>
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
            autoComplete='new-password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
        <button type='submit'>Registrieren</button>
        {error && <p role='alert'>{error}</p>}
      </form>
    </section>
  );
};

export { RegisterPage };
