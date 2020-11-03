<template>
  <main class="page-content">
    <div v-if="getSelectedPage">
      <h1>{{ getSelectedPage.title }}</h1>

      <ul v-for="(task, index) in getPageTasks" :key="index">
        <li>{{ task.content }}</li>
      </ul>

      <AddNewTask />
    </div>
    <div v-else>
      <p>please select a page</p>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

import AddNewTask from '../components/AddNewTask';

export default {
  name: 'PageContent',
  components: {
    AddNewTask
  },
  computed: {
    ...mapGetters(['getSelectedPage', 'getPageTasks'])
  }
};
</script>

<style>
.page-content {
  flex-grow: 3;
  padding-left: 3vw;
}
</style>
