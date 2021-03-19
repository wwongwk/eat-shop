
import Cart from './components/MyCart.vue' 
import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import Profile from './components/ProfilePage.vue'

export default[
  { path: '/', component: Home},
  {path:'/cart', component:Cart},
  {path:'/signup', component:SignUp},
  {path:'/login', component:Login},
  {path:'/profile', component:Profile}]