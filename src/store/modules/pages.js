import { firestoreAction } from 'vuexfire';
import { db } from '../../firebase';

const state = {
  pages: []
};

const getters = {
  getPages: state => state.pages
};

const mutations = {};

const actions = {
  setPagesRef: firestoreAction(context => {
    return context.bindFirestoreRef(
      'pages',
      db
        .collection('pages')
        .where('owner', '==', context.rootState.users.user.id)
    );
  }),

  createNewPage: ({ rootState }, newPageName) => {
    try {
      db.collection('pages').add({
        owner: rootState.users.user.id,
        title: newPageName
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default { state, getters, mutations, actions };
