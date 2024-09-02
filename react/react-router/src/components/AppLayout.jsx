
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import style from './Applayout.module.css'
function AppLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function toggle() {
    if (pathname === '/home') {
      navigate('/about');
      return;
    }

    navigate('/');
  }

  function getActive(path) {
    if (pathname == path) {
      return style.active
    } else {
      return style.inActive
    }
  }

  return (
    <>
      <button onClick={toggle} className={getActive("/home")}>Home</button>
      <button onClick={toggle} className={getActive("/about")}>About</button>
      <Outlet />
    </>
  );
}
export default AppLayout;
