import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/signup', name: 'SignUp', component: SignUp }
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
});

export default router;
