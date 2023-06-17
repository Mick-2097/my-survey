import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import Home from '../views/Home.vue'
import MySurveys from '../views/MySurveys.vue'
import Build from '../views/Build.vue'
import Preview from '../views/Preview.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'none',
      redirect: '/login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'My survey | Register'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'My survey | Login'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: 'My survey | Home',
        requiresAuth: true
      }
    },
    {
      path: '/my-surveys',
      name: 'my-surveys',
      component: MySurveys,
      meta: {
        title: 'My survey | Surveys',
        requiresAuth: true
      }
    },
    {
      path: '/build',
      name: 'build',
      component: Build,
      meta: {
        title: 'My survey | Build',
        requiresAuth: true
      }
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview,
      meta: {
        title: 'My survey | Preview',
        requiresAuth: true
      }
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      document.title = `${to.meta.title}`
      next()
    } else {
      // alert('Access to My survey requires an account')
      next('/login')
    }
  } else {
    document.title = `${to.meta.title}`
    next()
  }
})

export default router
