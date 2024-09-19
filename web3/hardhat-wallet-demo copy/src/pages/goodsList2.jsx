import { Routes, Route, NavLink,Navigate, Outlet } from 'react-router-dom'
function GoodsList({ children }) {

  return (
    <div>
      <NavLink to='/goods2/counter' style={({ isActive }) => {
        return {
          color: isActive ? "red" : "black",
        };
      }}>总分类</NavLink>
      <NavLink to='/goods2/detail' style={({ isActive }) => {
        return {
          color: isActive ? "red" : "black",
        };
      }}>商品列表</NavLink>
      <Outlet />
    </div>
  )
}

export default GoodsList