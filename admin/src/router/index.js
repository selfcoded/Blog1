import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategoryEdit from '../views/categoryEdit.vue'
import CategoryList from '../views/categoryList.vue'

import ThingsEdit from '../views/thingsEdit.vue'
import ThingsList from '../views/thingsList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name: 'login',
    component:Login,
    meta:{ isPublic:true}
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },
      { path: '/things/create', component: ThingsEdit },
      { path: '/things/edit/:id', component: ThingsEdit, props: true },
      { path: '/things/list', component: ThingsList },
      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/articles/list', component: ArticleList },
      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList }
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router
