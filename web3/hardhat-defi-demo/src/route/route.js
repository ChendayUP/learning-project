import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';
import GoodsList from '../pages/goodsList'
import GoodsCounter from '../pages/goodsCounter'
import GoodsDetail from '../pages/goodsDetail'
import TokenHome from '../pages/token/home'
import Marketplace from '../pages/nft/Marketplace'
import Profile from '../pages/nft/Profile';
import SellNFT from '../pages/nft/SellNFT';
import NFTPage from '../pages/nft/NFTpage';

const route = [
    {path: '/home', element: Home},
    {path: '/about', element: About},
    {path: '/login', element: Login},
    {path: '/token/home', element: TokenHome},
    {path: '/nft/marketplace', element: Marketplace},
    {path: '/nft/profile', element: Profile},
    {path: '/nft/sell', element: SellNFT},
    {path: '/nft/detail', element: NFTPage},
    {version: 'v5', path: '/goods/*', element: GoodsList, children: [
      { path: 'counter', element: GoodsCounter},
      { path: 'detail', element: GoodsDetail}
    ]},
]

export default route;