import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';

import { vuexfireMutations } from 'vuexfire';

Vue.use(Vuex);

export const store = new Vuex.Store({
  mutations: vuexfireMutations,
  modules: {
    users
  }
});
