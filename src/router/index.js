import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register'
import PlatformHome from '../components/Platformhome'
import MerchantPlatformHome from  '../components/MerchantPlatformhome'
import AdminPlatformHome from '../components/AdminPlatformhome'
import UserVerify from '../views/adminsystem/verify/userverify'
import MerchantVerify from '../views/adminsystem/verify/merchantverify'
import UserManagement from '../views/adminsystem/management/usermanagement'
import MerchantManagement from '../views/adminsystem/management/merchantmanagement'
import MerchantShop from '../views/merchantsystem/merchantshop'
import MerchantOrderForm from '../views/merchantsystem/orderform/merchantorderform'
import GoodsManagement from '../views/merchantsystem/goodsmanagement/goodsmanagement'
import GoodsVerify from '../views/adminsystem/verify/goodsverify'
import Search from '../views/usersystem/search'
import GoodsInformationShow from '../views/usersystem/goodsinformation/goodsinformationshow'
import ShoppingCart from '../views/usersystem/shoppingcart/shoppingcartpage'
import GoodsOrderForm from '../views/usersystem/orderform/goodsorderform'
import IntoStore from '../views/usersystem/goodsinformation/intostore'
import GoodsShow from '../views/merchantsystem/goodsmanagement/goodsshow'

Vue.use(VueRouter)

const routes = [
  {
    path:"/login",
    component: Login
  },
  {
    path:"/register",
    component: Register
  },

  {
    path:"/platformhome",
    component: PlatformHome
  },

  {
    path:"/merchantplatformhome",
    component: MerchantPlatformHome
  },
  {
    path:"/search",
    component: Search
  },
  {
    path:"/goodsinformationshow",
    component: GoodsInformationShow
  },
  {
    path: "/shoppingcart",
    component: ShoppingCart
  },
  {
    path: "/goodsorderform",
    component: GoodsOrderForm
  },
  {
    path: "/intostore",
    component: IntoStore
  },
  {
    path:"/goodsshow",
    component: GoodsShow 
  },

  { 
    path:"/adminplatformhome",
    component: AdminPlatformHome,
    children: [
      {
        path: '/adminplatformhome/userverify',
        component: UserVerify
      },
      {
        path: '/adminplatformhome/merchantverify',
        component: MerchantVerify
      },
      {
        path: '/adminplatformhome/usermanagement',
        component: UserManagement
      },{
        path: '/adminplatformhome/merchantmanagement',
        component: MerchantManagement
      },{
        path: '/adminplatformhome/goodsverify',
        component: GoodsVerify
      }
  
    ]
  },
 {
    path:"/merchantplatformhome",
    component: MerchantPlatformHome,
    children: [
      {
        path:"/merchantplatformhome/merchantshop",
        component: MerchantShop
      },
      {
        path:"/merchantplatformhome/merchantorderform",
        component: MerchantOrderForm
      },
      {
        path:"/merchantplatformhome/goodsmanagement",
        component: GoodsManagement
      },
    ]
  },



]

const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to,from,next)=>{
    if(to.path ==='/register')
      return next()
    if(to.path ==='/login')
      return next()
     const tokenstr = window.sessionStorage.getItem('token')    
    if(tokenstr!="ok")
      return next('/login')
    else{
      return next()
    }
  })
