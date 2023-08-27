import './App.css';

import {
  Route,
  Routes,
} from 'react-router-dom';

import Forbidden from './components/Forbidden';
import { ProtectedRoute } from './components/ProtectedRoute';
import CategoriaAdminPage from './pages/admin/CategoriaAdminPage';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
import DashboardUserPage from './pages/admin/DashboardUserPage';
import ProdutoAdminCreatePage from './pages/admin/ProdutoAdminCreatePage';
import ProdutoAdminDetailPage from './pages/admin/ProdutoAdminDetailPage';
import ProdutoAdminEditPage from './pages/admin/ProdutoAdminEditPage';
import ProdutoAdminListPage from './pages/admin/ProdutoAdminListPage';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forbidden" element={<Forbidden />} />

        <Route path="/user/dashboard" element={
          <ProtectedRoute userRole="user">
            <DashboardUserPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute userRole="admin">
            <DashboardAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/categoria" element={
          <ProtectedRoute userRole="admin">
            <CategoriaAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/produto" element={
          <ProtectedRoute userRole="admin">
            <ProdutoAdminListPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/produto/create" element={
          <ProtectedRoute userRole="admin">
            <ProdutoAdminCreatePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/produto/detail/:id" element={
          <ProtectedRoute userRole="admin">
            <ProdutoAdminDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/produto/edit/:id" element={
          <ProtectedRoute userRole="admin">
            <ProdutoAdminEditPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App;
