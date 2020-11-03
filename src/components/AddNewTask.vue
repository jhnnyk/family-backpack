<template>
  <div class="add-new-task">
    <button type="button" v-if="!formVisible" @click="showForm">
      <i class="material-icons">add_circle</i> add task
    </button>
    <form v-if="formVisible">
      <input type="text" placeholder="please enter a new task" />
      <button type="button">Submit</button>
      <button type="button" @click="cancelAddTask">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddNewTask',
  data() {
    return {
      formVisible: false
    };
  },
  methods: {
    showForm() {
      this.formVisible = true;
    },

    cancelAddTask() {
      this.formVisible = false;
    }
  }
};
</script>
