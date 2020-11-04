<template>
  <div class="add-new-page">
    <button type="button" v-if="!formVisible" @click="showForm">
      add new page
    </button>
    <form v-if="formVisible" @submit.prevent @keydown.enter="addPage">
      <label for="page-name">Page Name: </label>
      <input
        type="text"
        name="page-name"
        id="page-name"
        v-model="newPageTitle"
        :class="{ danger: hasPageTitleError }"
        @focus="clearErrorMessage"
      /><br />

      <label for="page-type">Page type: </label>
      <select
        name="page-type"
        id="page-type"
        v-model="newPageType"
        :class="{ danger: hasPageTypeError }"
        @focus="clearErrorMessage"
      >
        <option disabled value="">Please select one</option>
        <option value="todo-list">To Do List</option>
        <option value="daily-chores">Daily Chore List</option>
      </select>

      <p class="feedback">{{ feedback }}</p>

      <button type="button" @click="addPage">Submit</button>
      <button type="button" @click="cancelAddPage">Cancel</button>
    </form>
  </div>
</template>

<script>
import { store } from '../store/store';

export default {
  name: 'AddNewPage',
  data() {
    return {
      formVisible: false,
      newPageTitle: '',
      newPageType: '',
      hasPageTitleError: false,
      hasPageTypeError: false,
      feedback: ''
    };
  },
  methods: {
    showForm() {
      this.formVisible = true;
    },

    cancelAddPage() {
      this.formVisible = false;
      this.newPageTitle = '';
      this.newPageType = '';
      this.clearErrorMessage();
    },

    clearErrorMessage() {
      this.hasPageTitleError = false;
      this.hasPageTypeError = false;
      this.feedback = '';
    },

    async addPage() {
      if (!this.newPageTitle) {
        this.hasPageTitleError = true;
        this.feedback = 'Page Title is required.';
        return;
      }

      if (!this.newPageType) {
        this.hasPageTypeError = true;
        this.feedback = 'Page Type is required.';
        return;
      }

      const newPage = {
        title: this.newPageTitle,
        type: this.newPageType
      };

      this.formVisible = false;
      await store.dispatch('createNewPage', newPage);
      this.newPageTitle = '';
      this.newPageType = '';
    }
  }
};
</script>
