
import { Outlet, useNavigate, useLocation, NavLink } from 'react-router-dom';
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
    <div>
      <NavLink
        to="/home"
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "red" : "black",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "red" : "black",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}
      >
        About
      </NavLink>
      <NavLink
        to="/goods"
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "red" : "black",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}
      >
        商品
      </NavLink>
      <NavLink
        to="/goods2"
        style={({ isActive }) => {
          return {
            color: isActive ? "red" : "black",
          };
        }}
      >
        商品2
      </NavLink>
      </div>
      <div>
      <NavLink
        to="/wallet/home"
        style={({ isActive }) => {
          return {
            color: isActive ? "red" : "black",
          };
        }}
      >
        合约操作
      </NavLink>
      </div>
      <Outlet />
    </>
  );
}
export default AppLayout;
