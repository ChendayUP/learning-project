import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';
import GoodsList from '../pages/goodsList'
import GoodsCounter from '../pages/goodsCounter'
import GoodsDetail from '../pages/goodsDetail'
import TokenHome from '../pages/token/home'
import NFTHome from '../pages/nft/home'
const route = [
    {path: '/home', element: Home},
    {path: '/about', element: About},
    {path: '/login', element: Login},
    {path: '/token/home', element: TokenHome},
    {path: '/nft/home', element: NFTHome},
    {version: 'v5', path: '/goods/*', element: GoodsList, children: [
      { path: 'counter', element: GoodsCounter},
      { path: 'detail', element: GoodsDetail}
    ]},
]

export default route;