<template>
  <main class="page-content">
    <div v-if="getSelectedPage">
      <h1>{{ getSelectedPage.title }}</h1>

      <ul class="task-list">
        <li v-for="(task, index) in getPageTasks" :key="index">
          <input
            type="checkbox"
            :name="`task-${index}`"
            :id="`task-${index}`"
            :checked="!!task.completed"
            @click="toggleTaskComplete(task)"
          />
          <label :for="`task-${index}`">{{ task.content }}</label>
        </li>
      </ul>

      <AddNewTask />
    </div>
    <div v-else>
      <p>please select a page</p>
    </div>
  </main>
</template>

<script>
import { store } from '../store/store';
import { mapGetters } from 'vuex';

import AddNewTask from '../components/AddNewTask';

export default {
  name: 'PageContent',
  components: {
    AddNewTask
  },
  computed: {
    ...mapGetters(['getSelectedPage', 'getPageTasks'])
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
  },
  watch: {
    getPageTasks() {
      const todaysDate = new Date().getDate();

      this.getPageTasks.forEach(task => {
        if (task.completed !== 0 && task.completed !== todaysDate) {
          this.toggleTaskComplete(task);
        }
      });
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
