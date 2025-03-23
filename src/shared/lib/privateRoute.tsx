import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../app/store/store';
import { useSelector } from 'react-redux';

export function PrivateRoute() {
  const token = useSelector((state: RootState) => state.user.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
