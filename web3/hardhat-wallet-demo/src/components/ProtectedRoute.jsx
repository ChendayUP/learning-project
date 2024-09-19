import { Navigate, useLocation } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token')

  const whitelist = ['/login'];

  if (!token && !whitelist.includes(location.pathname)) {
    // 如果未通过鉴权，重定向到登录页，并记录当前访问的路径以便登录后重定向
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
