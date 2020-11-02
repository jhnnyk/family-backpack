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
        v-model="newPageName"
      />
      <button type="button" @click="addPage">Submit</button>
      <button type="button" @click="cancelAddPage">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewPageButton',
  data() {
    return {
      formVisible: false,
      newPageName: ''
    };
  },
  methods: {
    showForm() {
      this.formVisible = true;
    },

    cancelAddPage() {
      this.formVisible = false;
      this.newPageName = '';
    },

    addPage() {
      this.formVisible = false;
      console.log('add page...');
    }
  }
};
</script>
