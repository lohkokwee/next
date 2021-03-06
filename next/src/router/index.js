import { createRouter, createWebHistory } from 'vue-router'
import { getUserState } from '../firebase/firebase.js'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Profile from '../views/Profile.vue'
import LogIn from '../views/LogIn.vue'
import ForgotPW from '../views/ForgotPW.vue'
import SignUp from '../views/SignUp.vue'
import Onboarding from '../views/Onboarding.vue'
import Court from '../views/Court.vue'
import EditProfile from '../views/EditProfile.vue'
import Groups from '../views/Groups.vue'
import CreateGroup from '../views/CreateGroup.vue'
import PublicUser from '../views/PublicUser.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: About,

    },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    meta: { requiresUnauth: true }
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPW,
    meta: { requiresUnauth: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresUnauth: true }
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: Onboarding,
    meta: { requiresAuth: true }
  },
  {
    path: '/court',
    name: 'Court',
    component: Court,
    meta: { requiresAuth: true }
  },
  {
    path: '/editprofile',
    name: 'EditProfile',
    component: EditProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups,
    meta: { requiresAuth: true }
  },
  {
    path: '/creategroup',
    name: 'CreateGroup',
    component: CreateGroup,
    meta: { requiresAuth: true }
  },
  {
    path: '/publicuser',
    name: 'PublicUser',
    component: PublicUser,
    meta: { requiresAuth: true }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// The code below is for router guard

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)

  const isAuth = await getUserState()

  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/')
  else next()
})

export default router
