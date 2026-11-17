import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from '@/context/AuthProvider';
import { Navbar } from '@/components/Navbar';
import { HomePage } from '@/pages/HomePage';
import { DrinkPage } from '@/pages/DrinkPage';
import { CreateDrinkPage } from '@/pages/CreateDrinkPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProtectedLayout } from './layout/ProtectedLayout';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/drink/:id' element={<DrinkPage />} />
            <Route path='/create' element={<ProtectedLayout />}>
              <Route index element={<CreateDrinkPage />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
