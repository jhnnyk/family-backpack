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
        name: familyName
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default { state, getters, mutations, actions };
