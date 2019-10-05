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
const Dialog = () => import('@/components/Dialog')

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: '导航一',
      iconCls: 'el-icon-s-flag',
      leaf: false,
      children: [
          { 
            path: '/tabs', 
            component: Tabs, 
            name: 'Tabs', 
            iconCls: 'el-icon-star-on',
            meta: { // 在路由配置中加入meta:{requireAuth: true}
             requireAuth: true
            }
          },
          { 
            path: '/rate', 
            component: Rate, 
            name: 'Rate', 
            iconCls: 'el-icon-star-on',
            meta: { // 在路由配置中加入meta:{requireAuth: true}
             requireAuth: true
            }
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
            path: '/badge', 
            component: Badge, 
            name: 'Badge', 
            iconCls: 'el-icon-s-help',
            meta: { // 在路由配置中加入meta:{requireAuth: true}
             requireAuth: true
            }
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
            iconCls: 'el-icon-upload',
            meta: { // 在路由配置中加入meta:{requireAuth: true}
             requireAuth: true
            }
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
            iconCls: 'el-icon-s-cooperation',
            meta: { // 在路由配置中加入meta:{requireAuth: true}
             requireAuth: true
            }
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
            iconCls: 'el-icon-s-order',
            meta: { // 在路由配置中加入meta:{requireAuth: true}
             requireAuth: true
            }
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
            iconCls: 'el-icon-s-flag',
            meta: { // 在路由配置中加入meta:{requireAuth: true}
             requireAuth: true
            }
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
            iconCls: 'el-icon-s-flag',
            meta: { // 在路由配置中加入meta:{requireAuth: true}
             requireAuth: true
            }
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
            path: '/dialog', 
            component: Dialog, 
            name: 'Dialog', 
            iconCls: 'el-icon-s-flag',
            meta: { // 在路由配置中加入meta:{requireAuth: true}
             requireAuth: true
            }
          }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true,
      meta: { // 在路由配置中加入meta:{requireAuth: true}
       requireAuth: true
      }
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

export default router

router.beforeEach((to, from, next) => {
  let islogin = localStorage.getItem("islogin");
  islogin = Boolean(Number(islogin));

  if(to.path == "/login"){
    if(islogin){
      next("/table");
    }else{
      next();
    }
  }else{
    // requireAuth:可以在路由元信息指定哪些页面需要登录权限
    if(to.meta.requireAuth && islogin) {
      next();
    }else{
      next("/login");
    }
  }
})
