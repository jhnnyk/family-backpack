import { firestoreAction } from 'vuexfire';
import { db } from '../../firebase';

const state = {
  user: null
};

const getters = {};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  }
};

const actions = {
  setUser: firestoreAction((context, user) => {
    if (user) {
      context.bindFirestoreRef('user', db.doc(`users/${user.uid}`), {
        wait: true,
        serialize: doc => {
          return { id: doc.id, ...doc.data() };
        }
      });
    } else {
      context.commit('setUser', null);
    }
  })
};

export default { state, getters, mutations, actions };
