import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AppPrefs from './pages/AppPrefs';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/settings', name: 'AppPrefs', component: AppPrefs }
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
});

export default router;
