import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/Landing/LandingPage';
import Home from './pages/Dashboard/Home';
import AuthPage from './pages/Auth/AuthPage';
import Profile from './pages/Dashboard/Profile';


function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<LandingPage />} />
    <Route exact path="/auth" element={<AuthPage />} />
    {/**Try to add auth or protected routes for home page onwards */}
    <Route exact path="/home" element={<Home />} />
    <Route exact path="/profile" element={< Profile/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
