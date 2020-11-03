import { firestoreAction } from 'vuexfire';
import { db } from '../../firebase';

const state = {
  pages: [],
  selectedPage: null
};

const getters = {
  getPages: state => state.pages,
  getSelectedPage: state => state.selectedPage
};

const mutations = {
  selectPage: (state, page) => {
    state.selectedPage = page;
  }
};

const actions = {
  setPagesRef: firestoreAction(context => {
    return context.bindFirestoreRef(
      'pages',
      db
        .collection('pages')
        .where('owner', '==', context.rootState.users.user.id)
    );
  }),

  createNewPage: ({ rootState }, newPage) => {
    try {
      db.collection('pages').add({
        owner: rootState.users.user.id,
        title: newPage.title,
        type: newPage.type
      });
    } catch (error) {
      console.log(error);
    }
  },

  selectPage: ({ commit }, page) => {
    commit('selectPage', page);
  }
};

export default { state, getters, mutations, actions };
