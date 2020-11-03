import { firestoreAction } from 'vuexfire';
import { db } from '../../firebase';

const state = {
  pageTasks: []
};

const getters = {
  getPageTasks: state => state.pageTasks
};

const mutations = {};

const actions = {
  setTasksRef: firestoreAction(context => {
    context.bindFirestoreRef(
      'pageTasks',
      db
        .collection('pages')
        .doc(context.rootState.pages.selectedPage.id)
        .collection('tasks'),
      {
        wait: true,
        serialize: doc => {
          return { id: doc.id, ...doc.data() };
        }
      }
    );
  }),

  addTask: ({ rootState }, task) => {
    try {
      db.collection('pages')
        .doc(rootState.pages.selectedPage.id)
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