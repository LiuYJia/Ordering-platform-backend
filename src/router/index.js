import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import activity from '@/components/activity'
import order from '@/components/order'
import member from '@/components/member'
import goods from '@/components/goods'
import spike from '@/components/spike'
import coupon from '@/components/coupon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      hidden: true
    },
    {
      path: '/login',
      name: 'login2',
      component: login,
      hidden: true
    },{
      path: '/home',
      name: 'home',
      redirect:'/goods',
      component: home,
      hidden: true
    },
    {
      path: '/',
      component: home,
      name: '',
      iconCls: 'el-icon-goods',//图标样式class
      leaf: true,//只有一个节点,
      children: [
          { path: '/goods', component: goods, name: '商品管理' },
      ]
    },
    {
      path: '/',
      component: home,
      name: '',
      leaf: true,//只有一个节点,
      iconCls: 'el-icon-tickets',//图标样式class
      children: [
        { path: '/order', component: order, name: '订单管理' }
      ]
    },
    {
      path: '/activity',
      component: home,
      name: '活动管理',
      iconCls: 'el-icon-star-off',//图标样式class
      children: [
          { path: '/spike', component: spike, name: '限时秒杀' },
          { path: '/coupon', component: coupon, name: '优惠券' },
      ]
    },
    {
      path: '/',
      component: home,
      name: '',
      iconCls: 'el-icon-news',
      leaf: true,//只有一个节点
      children: [
          { path: '/member', component: member, name: '会员管理' }
      ]
    }
  ]
})
