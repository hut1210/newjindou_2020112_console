import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
}, {
  path: '/',
  name: 'Home',
  component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue'),
  children: [{
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
    },
    component: () =>
      import('@/views/merchant/home.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册用户管理',
    },
    component: () =>
      import('@/views/merchant/register.vue')
  },
  {
    path: '/toExamine',
    name: 'toExamine',
    meta: {
      title: '商户审核',
    },
    component: () =>
      import('@/views/merchant/toExamine.vue')
  },
  {
    path: '/toExamine-details',
    name: 'toExamine-details',
    meta: {
      title: '商户审核详情',
    },
    component: () =>
      import('@/views/merchant/toExamine/toExamine.vue')
  },
  {
    path: '/details',
    name: 'details',
    meta: {
      title: '详情',
    },
    component: () =>
      import('@/views/merchant/toExamine/details.vue')
  },
  {
    path: '/information',
    name: 'information',
    meta: {
      title: '商户基本信息管理',
    },
    component: () =>
      import('@/views/merchant/information.vue')
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      title: '商户账户查询',
    },
    component: () =>
      import('@/views/merchant/account.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    meta: {
      title: '订单信息查询',
    },
    component: () =>
      import('@/views/transaction/orders.vue')
  },
  {
    path: '/recharge',
    name: 'recharge',
    meta: {
      title: '充值审核',
    },
    component: () =>
      import('@/views/capital/recharge.vue')
  },
  {
    path: '/payment',
    name: 'payment',
    meta: {
      title: '代付审核',
    },
    component: () =>
      import('@/views/capital/payment.vue')
  },
  {
    path: '/payoutdetaillist',
    name: 'payoutdetaillist',
    meta: {
      title: '代付审核',
    },
    component: () =>
      import('@/views/capital/payoutdetaillist.vue')
  },
  {
    path: '/withdrawal',
    name: 'withdrawal',
    meta: {
      title: '提现审核',
    },
    component: () =>
      import('@/views/capital/withdrawal.vue')
  },
  {
    path: '/collection',
    name: 'collection',
    meta: {
      title: '收款到账审核',
    },
    component: () =>
      import('@/views/capital/collection.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      title: '资金流水记录',
    },
    component: () =>
      import('@/views/capital/record.vue')
  },
  {
    path: '/system-account',
    name: 'system-account',
    meta: {
      title: '资金流水记录',
    },
    component: () =>
      import('@/views/system/system-account.vue')
  },
  {
    path: '/parameter',
    name: 'parameter',
    meta: {
      title: '资金流水记录',
    },
    component: () =>
      import('@/views/system/parameter.vue')
  },
  {
    path: '/passageway',
    name: 'passageway',
    meta: {
      title: '资金流水记录',
    },
    component: () =>
      import('@/views/system/passageway.vue')
  },
  ]
},]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token')) {
    next();
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next("/login");
    }
  }
})

export default router