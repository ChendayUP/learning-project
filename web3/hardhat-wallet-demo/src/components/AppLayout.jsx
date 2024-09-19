
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
    <div className={style.container}>
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
      <div>
        <NavLink
          to="/wallet/connect"
          style={({ isActive }) => {
            return {
              color: isActive ? "red" : "black",
            };
          }}
        >
          钱包链接
        </NavLink>
        <NavLink
          to="/wallet/account"
          style={({ isActive }) => {
            return {
              color: isActive ? "red" : "black",
            };
          }}
        >
          钱包账号详细
        </NavLink>
        <NavLink
          to="/wallet/transaction"
          style={({ isActive }) => {
            return {
              color: isActive ? "red" : "black",
            };
          }}
        >
          交易
        </NavLink>
        <NavLink
          to="/wallet/network"
          style={({ isActive }) => {
            return {
              color: isActive ? "red" : "black",
            };
          }}
        >
          网络
        </NavLink>
        <NavLink
          to="/wallet/history"
          style={({ isActive }) => {
            return {
              color: isActive ? "red" : "black",
            };
          }}
        >
          交易历史
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
export default AppLayout;
