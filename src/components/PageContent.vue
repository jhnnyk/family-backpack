<template>
  <main class="page-content">
    <div v-if="selectedPage">
      <h1>{{ selectedPage.title }}</h1>
      <p v-if="selectedPage.type === 'daily-chores'">
        this is a Daily Chore page. all tasks will be reset each day
      </p>

      <ul class="task-list">
        <li v-for="(task, index) in pageTasks" :key="index">
          <TaskItem :task="task" />
        </li>
      </ul>

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

import AddNewTask from '../components/AddNewTask';
import TaskItem from '../components/TaskItem';

export default {
  name: 'PageContent',
  components: {
    AddNewTask,
    TaskItem
  },
  computed: {
    ...mapState({
      selectedPage: state => state.pages.selectedPage,
      pageTasks: state => state.tasks.pageTasks
    }),
    ...mapGetters(['userCanEdit'])
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
  flex-grow: 3;
  padding-left: 3vw;
}

.task-list li {
  list-style-type: none;
}
</style>
