import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MySurveys from '../views/MySurveys.vue'
import Build from '../views/Build.vue'
import Preview from '../views/Preview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'none',
      redirect: '/home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: 'My survey | Home'
      }
    },
    {
      path: '/my-surveys',
      name: 'my-surveys',
      component: MySurveys,
      meta: {
        title: 'My survey | Surveys'
      }
    },
    {
      path: '/build',
      name: 'build',
      component: Build,
      meta: {
        title: 'My survey | Build'
      }
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview,
      meta: {
        title: 'My survey | Preview'
      }
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})

export default router
