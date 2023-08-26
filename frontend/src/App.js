import './App.css';

import {
  Route,
  Routes,
} from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import CategoriaAdminPage from './pages/admin/CategoriaAdminPage';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
import ProdutoAdminCreatePage from './pages/admin/ProdutoAdminCreatePage';
import ProdutoAdminDetailPage from './pages/admin/ProdutoAdminDetailPage';
import ProdutoAdminEditPage from './pages/admin/ProdutoAdminEditPage';
import ProdutoAdminListPage from './pages/admin/ProdutoAdminListPage';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <DashboardAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/categoria" element={
          <ProtectedRoute>
            <CategoriaAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/produto" element={
          <ProtectedRoute>
            <ProdutoAdminListPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/produto/create" element={
          <ProtectedRoute>
            <ProdutoAdminCreatePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/produto/detail/:id" element={
          <ProtectedRoute>
            <ProdutoAdminDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/produto/edit/:id" element={
          <ProtectedRoute>
            <ProdutoAdminEditPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App;
