import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/Main'
import category from '@/components/Category'
import findByGoods from '@/components/findByGoods'
import regist from '@/components/Regist'
import login from '@/components/Login'
import goodsmanager from '@/components/userInfo/goodsManager'
import goodsadd from '@/components/userInfo/goodsAdd'
import goodsupdate from '@/components/userInfo/goodsUpdate'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
    },
    {
      path:"/Category/:categoryid",
      name:"类别",
      component:category
    },
    {
      path:'/findByGoods/:name',
      name:'findByGoods',
      component:findByGoods
    },
    {
      path:'/regist',
      name:'注册',
      component:regist
    },
    {
      path:'/login',
      name:'登录',
      component:login
    },
    {
      path:'/goodsmanager',
      name:'管理',
      component:goodsmanager
    },
    {
      path:'/goodsadd',
      name:'添加',
      component:goodsadd
    },
    {
      path:'/goodsupdate/:goodsid',
      name:'goodsupdate',
      component:goodsupdate
    }
  ],
  linkActiveClass:'navbar-header'
})
