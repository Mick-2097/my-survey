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
      component: Home
    },
    {
      path: '/my-surveys',
      name: 'my-surveys',
      component: MySurveys
    },
    {
      path: '/build',
      name: 'build',
      component: Build
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    }
    
  ]
})

export default router
