import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import Profile from './components/ProfilePage.vue'
import EatPage from './components/Eat/EatPage.vue'
import ShopPage from './components/Shop/ShopPage.vue'
import EatDetail from './components/Eat/EatDetail.vue'
import ChangePW from './components/ChangePW.vue'
import MerchantHome from './components/Merchant/MerchantHome.vue'
import BizSignUp from './components/BizSignUp.vue'
import ShopDetail from './components/Shop/ShopDetailPage'
import MyFavorites from './components/MyFavorites.vue'
import UpcomingReservations from './components/UpcomingReservations.vue'
import PastEvents from './components/PastEvents.vue'

export default[
  {path: '/', component: Home},
  {path:'/signup', component:SignUp},
  {path:'/login', component:Login},
  {path:'/profile', component:Profile},
  {path:'/eat', component:EatPage},
  {path:'/shop', component:ShopPage},
  {path:'/shopDetail', name: 'shopDetail', component:ShopDetail},
  {path:'/eatDetail', name: 'eatDetail', component:EatDetail},
  {path:'/changepw', component:ChangePW},
  {path:'/merchant', component:MerchantHome},
  {path:'/bizsignup', component:BizSignUp},
  {path:'/myFav', component:MyFavorites},
  {path:'/upcoming', component:UpcomingReservations},
  {path:'/past', component:PastEvents},
]
