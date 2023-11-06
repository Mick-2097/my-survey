import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
import { authData } from '../stores/auth-data'
import Home from '../views/Home.vue'
import MySurveys from '../views/MySurveys.vue'
import SurveyPage from '../views/SurveyPage.vue'
import Results from '../views/Results.vue'
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
      path: '/results/',
      name: 'results',
      component: Results,
      meta: {
        title: 'My survey | Results',
        requiresAuth: true
      }
    },
    {
      path: '/:uid/:sid',
      name: 'survey',
      component: SurveyPage,
      meta: {
        title: 'My survey | Surveys',
        requiresAuth: false
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  await setPersistence(getAuth(), browserLocalPersistence)

  if (requiresAuth) {
    const user = await new Promise((resolve) => {
      const stopWatching = onAuthStateChanged(getAuth(), (user) => {
        stopWatching()
        resolve(user)
      })
    })
    if (user) {
      document.title = `${to.meta.title}`
      authData().UID = user.uid
      authData().name = user.displayName
      next()
    } else {
      next('/login')
    }
  } else {
    document.title = `${to.meta.title}`
    next()
  }
})

export default router
