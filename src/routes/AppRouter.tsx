import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../features/auth/LoginPage';
import { PostsList } from '../features/posts/PostList';
import PrivateRoute from '../features/auth/PrivateRoute';
import { Header } from '../components/Header';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route
        path='*'
        element={
          <PrivateRoute>
            <div className='p-4'>
              <Header />
              <PostsList />
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
