import { firestoreAction } from 'vuexfire';
import { db } from '../../firebase';

const state = {
  family: null
};

const getters = {};

const mutations = {};

const actions = {
  setFamilyRef: firestoreAction(context => {
    context.bindFirestoreRef(
      'family',
      db
        .collection('families')
        .where('members', 'array-contains-any', [
          context.rootState.users.user.id
        ]),
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
        parents: [rootState.users.user.id],
        name: familyName
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default { state, getters, mutations, actions };
