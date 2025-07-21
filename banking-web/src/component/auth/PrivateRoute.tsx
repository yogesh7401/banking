import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';
import Layout from '../../dashboard/Layout';
import { useEffect } from 'react';
import { fetchUser } from '../../redux/authSlice';
import LoaderComponent from '../utils/LoaderComponent';

const PrivateRoute = () => {
  const dispatch = useAppDispatch();
  const { token, user, isLoading} = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, token, user]);

  if (isLoading) return <LoaderComponent />;

  if (user) return <Layout />;

  if (!user && !isLoading) return <Navigate to="/login" replace />;
  
};

export default PrivateRoute;
