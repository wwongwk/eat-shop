
import Cart from './components/MyCart.vue' 
import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import Profile from './components/ProfilePage.vue'
import EatPage from './components/Eat/EatPage.vue'
import EatDetailPage from './components/Eat/EatDetailPage.vue'
import PlayPage from './components/Play/PlayPage.vue'
import PlayDetailPage from './components/Play/PlayDetailPage.vue'
import ShopPage from './components/Shop/ShopPage.vue'
import EatDetailTemplate from './components/Eat/EatDetailTemplate.vue'
import ChangePW from './components/ChangePW.vue'
import MerchantHome from './components/Merchant/MerchantHome.vue'
import BizSignUp from './components/BizSignUp.vue'

export default[
  {path: '/', component: Home},
  {path:'/cart', component:Cart},
  {path:'/signup', component:SignUp},
  {path:'/login', component:Login},
  {path:'/profile', component:Profile},
  {path:'/eat', component:EatPage},
  {path:'/play', component:PlayPage},
  {path:'/shop', component:ShopPage},
  {path:'/eatDetail', component:EatDetailPage},
  {path:'/eat/Detail', name: 'N', component:EatDetailTemplate},
  {path:'/playDetail', component:PlayDetailPage},
  {path:'/changepw', component:ChangePW},
  {path:'/merchant', component:MerchantHome},
  {path:'/bizsignup', component:BizSignUp}
]
