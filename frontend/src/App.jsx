import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';
import LandingPage from './pages/Landing/LandingPage';
import Home from './pages/Dashboard/Home';
import AuthPage from './pages/Auth/AuthPage';
import Profile from './pages/Dashboard/Profile';
import SharedContent from './pages/Dashboard/SharedContent';

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          
          {/* Public Route */}
          <Route path="/shared/:hash" element={<SharedContent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
