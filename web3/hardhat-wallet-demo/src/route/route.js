import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';
import GoodsList from '../pages/goodsList'
import GoodsCounter from '../pages/goodsCounter'
import GoodsDetail from '../pages/goodsDetail'
import WalletConnect from '../pages/wallet/connect'
import WalletAccount from '../pages/wallet/account'
import WalletTransaction from '../pages/wallet/transaction'
import WalletNetwork from '../pages/wallet/network'
import WalletHistory from '../pages/wallet/history'

const route = [
    {path: '/home', element: Home},
    {path: '/about', element: About},
    {path: '/login', element: Login},
    {path: '/wallet/connect', element: WalletConnect},
    {path: '/wallet/account', element: WalletAccount},
    {path: '/wallet/transaction', element: WalletTransaction},
    {path: '/wallet/network', element: WalletNetwork},
    {path: '/wallet/history', element: WalletHistory},
    {version: 'v5', path: '/goods/*', element: GoodsList, children: [
      { path: 'counter', element: GoodsCounter},
      { path: 'detail', element: GoodsDetail}
    ]},
]

export default route;