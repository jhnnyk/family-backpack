<template>
  <main class="page-content">
    <div v-if="selectedPage">
      <PageAdmin v-if="userCanEdit" />

      <h1>{{ selectedPage.title }}</h1>
      <p v-if="selectedPage.type === 'daily-chores'">
        this is a Daily Chore page. all tasks will be reset each day
      </p>

      <draggable
        v-model="pageTasks"
        tag="ul"
        class="task-list"
        handle=".reorder-handle"
      >
        <li v-for="(task, index) in pageTasks" :key="index">
          <TaskItem :task="task" />
        </li>
      </draggable>

      <AddNewTask v-if="userCanEdit" />
    </div>
    <div v-else>
      <p>please select a page</p>
    </div>
  </main>
</template>

<script>
import { store } from '../store/store';
import { mapGetters, mapState } from 'vuex';
import draggable from 'vuedraggable';

import AddNewTask from '../components/AddNewTask';
import TaskItem from '../components/TaskItem';
import PageAdmin from '../components/PageAdmin';

export default {
  name: 'PageContent',
  components: {
    AddNewTask,
    TaskItem,
    PageAdmin,
    draggable
  },
  computed: {
    ...mapState({
      selectedPage: state => state.pages.selectedPage
    }),
    ...mapGetters(['userCanEdit']),
    pageTasks: {
      get() {
        return store.state.tasks.pageTasks;
      },
      set(reorderedTasks) {
        store.dispatch('reorderTasks', reorderedTasks);
      }
    }
  },
  watch: {
    pageTasks() {
      // reset tasks daily on Daily Chore pages
      if (this.selectedPage.type === 'daily-chores') {
        const todaysDate = new Date().getDate();

        this.pageTasks.forEach(task => {
          if (task.completed !== 0 && task.completed !== todaysDate) {
            this.toggleTaskComplete(task);
          }
        });
      }
    }
  },
  methods: {
    async toggleTaskComplete(task) {
      if (task.completed) {
        task.completed = 0;
        await store.dispatch('updateTask', task);
      } else {
        task.completed = new Date().getDate();
        await store.dispatch('updateTask', task);
      }
    }
  }
};
</script>

<style>
.page-content {
  position: relative;
  width: 75%;
  padding-left: 3vw;
}

.page-content h1 {
  margin-bottom: 10px;
}

.page-content .task-list li {
  list-style-type: none;
}
</style>
