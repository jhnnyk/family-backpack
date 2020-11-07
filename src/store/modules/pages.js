import { firestoreAction } from 'vuexfire';
import { db } from '../../firebase';

const state = {
  pages: [],
  selectedPage: null
};

const getters = {
  getPages: state => state.pages,
  getSelectedPage: state => state.selectedPage,
  userCanEdit: (state, getters) => {
    if (state.selectedPage) {
      // must be a parent to edit Daily Chore pages or be the page owner of a normal page
      return (
        (getters.currentUserIsParent &&
          state.selectedPage.type === 'daily-chores') ||
        (state.selectedPage.type !== 'daily-chores' &&
          state.selectedPage.owner === getters.getUser.id)
      );
    } else {
      return false;
    }
  }
};

const mutations = {
  selectPage: (state, page) => {
    state.selectedPage = page;
  }
};

const actions = {
  setPagesRef: firestoreAction(context => {
    context.bindFirestoreRef(
      'pages',
      db
        .collection('pages')
        .where('owner', '==', context.rootState.users.user.id),
      {
        wait: true,
        serialize: doc => {
          return { id: doc.id, ...doc.data() };
        }
      }
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

  createDefaultChorePage: (context, child) => {
    try {
      db.collection('pages').add({
        owner: child.id,
        title: 'Daily Chores',
        type: 'daily-chores'
      });
    } catch (error) {
      console.log(error);
    }
  },

  selectPage: async ({ dispatch, commit }, page) => {
    await commit('selectPage', page);
    dispatch('setTasksRef', page);
  },

  clearSelectedPage: ({ commit }) => {
    commit('selectPage', null);
  }
};

export default { state, getters, mutations, actions };
