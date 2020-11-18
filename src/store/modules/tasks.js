import { firestoreAction } from 'vuexfire';
import { db } from '../../firebase';

const state = {
  pageTasks: []
};

const getters = {};

const mutations = {};

const actions = {
  setTasksRef: firestoreAction(context => {
    context.bindFirestoreRef(
      'pageTasks',
      db
        .collection('pages')
        .doc(context.rootState.pages.selectedPage.id)
        .collection('tasks')
        .orderBy('sortOrder'),
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
          completed: 0,
          sortOrder: 0
        });
    } catch (error) {
      console.log(error);
    }
  },

  updateTask: ({ rootState }, task) => {
    try {
      db.collection('pages')
        .doc(rootState.pages.selectedPage.id)
        .collection('tasks')
        .doc(task.id)
        .update({
          ...task
        });
    } catch (error) {
      console.log(error);
    }
  },

  deleteTask: ({ rootState }, task) => {
    try {
      db.collection('pages')
        .doc(rootState.pages.selectedPage.id)
        .collection('tasks')
        .doc(task.id)
        .delete();
    } catch (error) {
      console.log(error);
    }
  },

  reorderTasks: ({ rootState }, tasks) => {
    try {
      tasks.forEach((task, index) => {
        db.collection('pages')
          .doc(rootState.pages.selectedPage.id)
          .collection('tasks')
          .doc(task.id)
          .update({ sortOrder: index });
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default { state, getters, mutations, actions };
