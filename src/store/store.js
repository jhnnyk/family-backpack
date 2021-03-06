import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';
import pages from './modules/pages';
import tasks from './modules/tasks';
import families from './modules/families';

import { vuexfireMutations } from 'vuexfire';

Vue.use(Vuex);

export const store = new Vuex.Store({
  mutations: vuexfireMutations,
  modules: {
    users,
    pages,
    tasks,
    families
  }
});
