import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound';
function App() {
  return (
    // <BrowserRouter>
    <HashRouter>
      <Routes>
        <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </HashRouter>
    // </BrowserRouter>
  );
}
export default App;
