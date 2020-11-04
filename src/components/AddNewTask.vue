<template>
  <div class="add-new-task">
    <button type="button" v-if="!formVisible" @click="showForm">
      <i class="material-icons">add_circle</i> add task
    </button>
    <form v-if="formVisible" @submit.prevent @keydown.enter="addNewTask">
      <input
        type="text"
        id="task-content"
        v-model="taskContent"
        placeholder="please enter a new task"
        :class="{ danger: hasTaskContentError }"
        @focus="clearErrorMessage"
      />

      <p class="feedback">{{ feedback }}</p>

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
      taskContent: '',
      hasTaskContentError: false,
      feedback: ''
    };
  },
  methods: {
    showForm() {
      this.formVisible = true;
    },

    cancelAddTask() {
      this.formVisible = false;
      this.taskContent = '';
      this.clearErrorMessage();
    },

    clearErrorMessage() {
      this.hasTaskContentError = false;
      this.feedback = '';
    },

    async addNewTask() {
      if (!this.taskContent) {
        this.hasTaskContentError = true;
        this.feedback = 'Task cannot be blank.';
        return;
      }

      const newTask = {
        content: this.taskContent
      };

      this.formVisible = false;
      await store.dispatch('addTask', newTask);
      this.taskContent = '';
    }
  }
};
</script>
