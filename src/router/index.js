import { createRouter, createWebHashHistory } from 'vue-router'


import Home from '../view/Home.vue'
import Container from '../view/Container.vue'
import Says from '../view/Says.vue'
import Login from '../view/Login.vue'
import Admin from '../view/Admin.vue'
import Details from '../view/Details.vue'
import Cart from '../view/Cart.vue'
import Settlement from '../view/Settlement.vue'
import Orders from '../view/Orders.vue'
import AdminPainter from '../view/AdminPainter.vue'
import Painter from '../view/painter.vue'
import PersonalCenter from '../view/PersonalCenter.vue'



const routes = [
  {
    path: '/',
    redirect: '/container'
  },
  {
    path: '/container/home',
    component: Container,
    children: [
      {
        path: '/container/home',
        name: 'home',
        component: Home,
      },
      {
        path: '/container/AdminPainter',
        name: 'AdminPainter',
        component: AdminPainter,
      },
      {
        path: '/container/Painter/:id',
        name: 'Painter',
        component: Painter,
      },
      {
        path: '/container/orders',
        name: 'orders',
        component: Orders,
      },
      
      {
        path: '/container/settlement',
        name: 'settlement',
        component: Settlement,
      },
      
      {
        path: '/container/admin',
        name: 'admin',
        component: Admin,
      },
      {
        path: '/container/says',
        name: 'says',
        component: Says,
      },
      {
        path: '/container/details/:id',
        name: 'details',
        component: Details,
      },
      {
        path: '/container/cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path: '/container/PersonalCenter',
        name: 'PersonalCenter',
        component: PersonalCenter,
      },
      
      {
        path: '/container/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/container',
        redirect: '/container/home'
      },

    ]
  },
]


const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router