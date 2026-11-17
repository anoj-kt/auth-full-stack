import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <section>
      <h1>Seite nicht gefunden</h1>
      <Link to='/'>Zur Drink-Liste</Link>
    </section>
  );
};

export { NotFoundPage };
