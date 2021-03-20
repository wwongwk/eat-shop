
import Cart from './components/MyCart.vue' 
import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import Profile from './components/ProfilePage.vue'
import EatPage from './components/Eat/EatPage.vue'
import EatDetailPage from './components/Eat/EatDetailPage.vue'
import PlayPage from './components/Play/PlayPage.vue'
import ShopPage from './components/Shop/ShopPage.vue'

export default[
  { path: '/', component: Home},
  {path:'/cart', component:Cart},
  {path:'/signup', component:SignUp},
  {path:'/login', component:Login},
  {path:'/profile', component:Profile},
  {path:'/eat', component:EatPage},
  {path:'/play', component:PlayPage},
  {path:'/shop', component:ShopPage},
  {path:'/eatDetail', component:EatDetailPage},
]
