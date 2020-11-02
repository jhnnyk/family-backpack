import { db } from '../../firebase';

const state = {};

const getters = {};

const mutations = {};

const actions = {
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
