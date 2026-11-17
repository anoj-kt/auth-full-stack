import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <nav aria-label='Hauptnavigation'>
        <ul>
          <li>
            <Link to='/'>Drinks</Link>
          </li>
          {user && (
            <li>
              <Link to='/create'>Drink anlegen</Link>
            </li>
          )}

          {user ? (
            <li onClick={handleLogout} className='cursor-pointer'>
              Abmelden
            </li>
          ) : (
            <>
              <li>
                <Link to='/login'>Anmelden</Link>
              </li>
              <li>
                <Link to='/register'>Registrieren</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {user && <p>Willkommen, {user.email}.</p>}
    </header>
  );
};

export { Navbar };
