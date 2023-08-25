import './App.css';

import {
  Route,
  Routes,
} from 'react-router-dom';

import DashboardAdminPage from './pages/admin/DashboardAdminPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/dashboard" element={<DashboardAdminPage />} />
      </Routes>
    </div>
  )
}

export default App;
