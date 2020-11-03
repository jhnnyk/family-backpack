import { db } from '../../firebase';

const state = {};

const getters = {};

const mutations = {};

const actions = {
  addTask: ({ rootState }, task) => {
    try {
      db.collection('pages')
        .doc(`${rootState.pages.selectedPage.id}`)
        .collection('tasks')
        .add({
          content: task.content,
          completed: 0
        });
    } catch (error) {
      console.log(error);
    }
  }
};

export default { state, getters, mutations, actions };
