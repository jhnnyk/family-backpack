import firebase from 'firebase/app';
import { firestoreAction } from 'vuexfire';
import { db } from '../../firebase';

const state = {
  family: null
};

const getters = {
  getFamily: state => {
    if (state.family) {
      return state.family[0];
    } else {
      return null;
    }
  },

  currentUserIsParent: (state, getters, rootState) => {
    const isParent = p => p.id === rootState.users.user.id;
    return state.family[0].parents.some(isParent);
  }
};

const mutations = {};

const actions = {
  setFamilyRef: firestoreAction((context, user) => {
    context.bindFirestoreRef(
      'family',
      db
        .collection('families')
        .where('members', 'array-contains-any', [user.uid]),
      {
        wait: true,
        serialize: doc => {
          return { id: doc.id, ...doc.data() };
        }
      }
    );
  }),

  createNewFamily: ({ rootState }, familyName) => {
    try {
      db.collection('families').add({
        members: [rootState.users.user.id],
        parents: [rootState.users.user],
        children: [],
        name: familyName
      });
    } catch (error) {
      console.log(error);
    }
  },

  addParentToFamily: ({ state }, parent) => {
    try {
      const familyRef = db.collection('families').doc(state.family[0].id);
      familyRef.update({
        members: firebase.firestore.FieldValue.arrayUnion(parent.id),
        parents: firebase.firestore.FieldValue.arrayUnion(parent)
      });
    } catch (error) {
      console.log(error);
    }
  },

  addChildToFamily: async ({ dispatch, state }, child) => {
    try {
      const familyRef = db.collection('families').doc(state.family[0].id);
      await familyRef.update({
        members: firebase.firestore.FieldValue.arrayUnion(child.id),
        children: firebase.firestore.FieldValue.arrayUnion(child)
      });
      dispatch('createDefaultChorePage', child);
    } catch (error) {
      console.log(error);
    }
  }
};

export default { state, getters, mutations, actions };
