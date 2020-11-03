<template>
  <div class="add-new-task">
    <button type="button" v-if="!formVisible" @click="showForm">
      <i class="material-icons">add_circle</i> add task
    </button>
    <form v-if="formVisible">
      <input
        type="text"
        v-model="taskContent"
        placeholder="please enter a new task"
      />
      <button type="button" @click="addNewTask">Submit</button>
      <button type="button" @click="cancelAddTask">Cancel</button>
    </form>
  </div>
</template>

<script>
import { store } from '../store/store';

export default {
  name: 'AddNewTask',
  data() {
    return {
      formVisible: false,
      taskContent: ''
    };
  },
  methods: {
    showForm() {
      this.formVisible = true;
    },

    async addNewTask() {
      const newTask = {
        content: this.taskContent
      };

      this.formVisible = false;
      await store.dispatch('addTask', newTask);
      this.taskContent = '';
    },

    cancelAddTask() {
      this.formVisible = false;
      this.taskContent = '';
    }
  }
};
</script>
