import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound';

import routeList from './route/route';

import GoodsList2 from './pages/goodsList2'
import GoodsCounter from './pages/goodsCounter'
import GoodsDetail from './pages/goodsDetail'
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
          {
            routeList.map((route) => {
              if (route.children) {
                return <Route path={route.path} key={route.path} element={<route.element children={route.children}/>} />
              } else {
                return <Route path={route.path} key={route.path} element={<route.element />} />
              }
            })
          }
        <Route path="/goods2" element={<GoodsList2 />}>
          <Route path="/goods2" element={<Navigate to="/goods2/counter" replace />} />
          <Route path='counter' element={<GoodsCounter />} />
          <Route path='detail' element={<GoodsDetail /> } />
        </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </HashRouter>
    // </BrowserRouter>
  );
}
export default App;
