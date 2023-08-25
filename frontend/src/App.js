import './App.css';

import {
  Route,
  Routes,
} from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import CategoriaAdminPage from './pages/admin/CategoriaAdminPage';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
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
      </Routes>
    </div>
  )
}

export default App;
