import { Navigate, Route, Routes } from 'react-router-dom';
import { DocsPage, LoginPage } from '../../pages';
import { PrivateRoute } from '../../shared/lib/privateRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DocsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
