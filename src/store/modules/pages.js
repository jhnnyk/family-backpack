import firebase from 'firebase/app';
import { firestoreAction } from 'vuexfire';
import { db } from '../../firebase';

const state = {
  pages: [],
  childsPages: [],
  pageInvites: [],
  collabPages: [],
  selectedPage: null
};

const getters = {
  userCanEdit: (state, getters, rootState) => {
    if (state.selectedPage) {
      return (
        // must be a parent to edit Daily Chore pages
        (getters.currentUserIsParent &&
          state.selectedPage.type === 'daily-chores') ||
        // or be the page owner of a normal page
        (state.selectedPage.type !== 'daily-chores' &&
          state.selectedPage.owner === rootState.users.user.id) ||
        // or be a collaborator on a normal page
        (state.selectedPage.type !== 'daily-chores' &&
          state.selectedPage.collaborators.includes(rootState.users.user.email))
      );
    } else {
      return false;
    }
  },

  selectedPageId: state => {
    if (state.selectedPage) {
      return state.selectedPage.id;
    } else {
      return 0;
    }
  }
};

const mutations = {
  selectPage: (state, page) => {
    state.selectedPage = page;
  },

  setChildsPages: (state, pages) => {
    state.childsPages = pages;
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

  setPageInvitesRef: firestoreAction(context => {
    context.bindFirestoreRef(
      'pageInvites',
      db
        .collection('pages')
        .where('invites', 'array-contains', context.rootState.users.user.email),
      {
        wait: true,
        serialize: doc => {
          return { id: doc.id, ...doc.data() };
        }
      }
    );
  }),

  setCollabPagesRef: firestoreAction(context => {
    context.bindFirestoreRef(
      'collabPages',
      db
        .collection('pages')
        .where(
          'collaborators',
          'array-contains',
          context.rootState.users.user.email
        ),
      {
        wait: true,
        serialize: doc => {
          return { id: doc.id, ...doc.data() };
        }
      }
    );
  }),

  setCurrentPageRef: firestoreAction((context, page) => {
    context.bindFirestoreRef(
      'selectedPage',
      db.collection('pages').doc(page.id),
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
        type: newPage.type,
        invites: [],
        collaborators: []
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

  selectPage: async ({ dispatch }, page) => {
    dispatch('setCurrentPageRef', page);
    dispatch('setTasksRef', page);
  },

  clearSelectedPage: ({ commit }) => {
    commit('selectPage', null);
  },

  getChildsPages: async ({ commit }, childId) => {
    const childsPages = [];

    try {
      const childsPagesRef = await db
        .collection('pages')
        .where('owner', '==', childId)
        .get();

      childsPagesRef.forEach(page => {
        childsPages.push({ id: page.id, ...page.data() });
      });

      commit('setChildsPages', childsPages);
    } catch (error) {
      console.log(error);
    }
  },

  updatePageTitle: (context, newTitle) => {
    try {
      db.collection('pages')
        .doc(state.selectedPage.id)
        .update({
          title: newTitle
        });
    } catch (error) {
      console.log(error);
    }
  },

  inviteCollaborator: (context, email) => {
    try {
      db.collection('pages')
        .doc(state.selectedPage.id)
        .update({
          invites: firebase.firestore.FieldValue.arrayUnion(email)
        });
    } catch (error) {
      console.log(error);
    }
  },

  acceptInvite: (context, page) => {
    try {
      // remove user from invites array
      context.dispatch('declineInvite', page);
      // add user to collaborators array
      db.collection('pages')
        .doc(page.id)
        .update({
          collaborators: firebase.firestore.FieldValue.arrayUnion(
            context.rootState.users.user.email
          )
        });
    } catch (error) {
      console.log(error);
    }
  },

  declineInvite: (context, page) => {
    try {
      db.collection('pages')
        .doc(page.id)
        .update({
          invites: firebase.firestore.FieldValue.arrayRemove(
            context.rootState.users.user.email
          )
        });
    } catch (error) {
      console.log(error);
    }
  },

  removeInvite: (context, email) => {
    try {
      db.collection('pages')
        .doc(context.rootState.pages.selectedPage.id)
        .update({
          invites: firebase.firestore.FieldValue.arrayRemove(email)
        });
    } catch (error) {
      console.log(error);
    }
  },

  removeCollaborator: (context, email) => {
    try {
      db.collection('pages')
        .doc(context.rootState.pages.selectedPage.id)
        .update({
          collaborators: firebase.firestore.FieldValue.arrayRemove(email)
        });
    } catch (error) {
      console.log(error);
    }
  }
};

export default { state, getters, mutations, actions };
