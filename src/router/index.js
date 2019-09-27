import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/HelloWorld')
const Badge = () => import('@/components/Badge')
const Progress = () => import('@/components/Progress')
const Table = () => import('@/components/Table')
const Tag = () => import('@/components/Tag')
const Chart = () => import('@/components/Chart')
const NotFound = () => import('@/components/NotFound')
const Login = () => import('@/components/Login')
const Tabs = () => import('@/components/Tabs')
const Rate = () => import('@/components/Rate')
const Form = () => import('@/components/Form')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: '导航一',
      iconCls: 'el-icon-s-flag',
      leaf: false,
      children: [
          { path: '/tabs', component: Tabs, name: 'Tabs', iconCls: 'el-icon-star-on'},
          { path: '/rate', component: Rate, name: 'Rate', iconCls: 'el-icon-star-on'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'Home',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
          { 
            path: '/badge', 
            component: Badge, 
            name: 'Badge', 
            iconCls: 'el-icon-s-help'
          }
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'Home',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
          { 
            path: '/table', 
            component: Table, 
            name: 'Table', 
            iconCls: 'el-icon-upload'
          }
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'Home',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
          { 
            path: '/tag', 
            component: Tag, 
            name: 'Tag', 
            iconCls: 'el-icon-s-cooperation'
          }
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'Home',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
          { 
            path: '/progress', 
            component: Progress, 
            name: 'Progress', 
            iconCls: 'el-icon-s-order'
          }
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'Home',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
          { 
            path: '/chart', 
            component: Chart, 
            name: 'Chart', 
            iconCls: 'el-icon-s-flag'
          }
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'Home',
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
          { 
            path: '/form', 
            component: Form, 
            name: 'Form', 
            iconCls: 'el-icon-s-flag'
          }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    },
    {
      path: '/404',
      hidden: true,
      name: '',
      component: NotFound
    }
  ]
})
