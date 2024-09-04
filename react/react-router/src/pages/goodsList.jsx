import { Routes, Route, NavLink,Navigate } from 'react-router-dom'
function GoodsList({ children }) {

  return (
    <div>
      <NavLink to='/goods/counter' style={({ isActive }) => {
        return {
          color: isActive ? "red" : "black",
        };
      }}>总分类</NavLink>
      <NavLink to='/goods/detail' style={({ isActive }) => {
        return {
          color: isActive ? "red" : "black",
        };
      }}>商品列表</NavLink>
      <Routes>
        <Route path="/" element={<Navigate to="/goods/counter" replace />} />
        {
          children.map((route) => {
            return <Route path={route.path} key={route.path} element={<route.element />}></Route>
          })
        }
      </Routes>
    </div>
  )
}

export default GoodsList