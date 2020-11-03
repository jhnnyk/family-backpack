<template>
  <div class="new-page-button">
    <button type="button" v-if="formVisible === false" @click="showForm">
      add new page
    </button>
    <form v-if="formVisible === true">
      <label for="page-name">Page Name:</label>
      <input
        type="text"
        name="page-name"
        id="page-name"
        v-model="newPageTitle"
      />

      <label for="page-type">Page type:</label>
      <select name="page-type" id="page-type" v-model="newPageType">
        <option disabled value="">Please select one</option>
        <option value="todo-list">To Do List</option>
        <option value="daily-chores">Daily Chore List</option>
      </select>

      <button type="button" @click="addPage">Submit</button>
      <button type="button" @click="cancelAddPage">Cancel</button>
    </form>
  </div>
</template>

<script>
import { store } from '../store/store';

export default {
  name: 'NewPageButton',
  data() {
    return {
      formVisible: false,
      newPageTitle: '',
      newPageType: ''
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
    },

    async addPage() {
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
