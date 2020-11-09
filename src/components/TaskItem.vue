<template>
  <div class="task-item">
    <div v-if="!currentlyEditing">
      <input
        type="checkbox"
        :name="task.id"
        :id="task.id"
        :checked="!!task.completed"
        @click="toggleTaskComplete(task)"
      />
      <label :for="task.id">{{ task.content }}</label>
      <a @click="currentlyEditing = true" title="edit"
        ><i class="material-icons">edit</i></a
      >
    </div>

    <div v-if="currentlyEditing">
      <input
        type="text"
        v-model="task.content"
        @keydown.enter="saveEdits(task)"
      />
      <a @click="saveEdits(task)" title="save changes"
        ><i class="material-icons">done</i></a
      >
      <a @click="currentlyEditing = false" title="undo changes"
        ><i class="material-icons">undo</i></a
      >
    </div>
  </div>
</template>

<script>
import { store } from '../store/store';

export default {
  name: 'TaskItem',
  props: {
    task: Object
  },
  data() {
    return {
      currentlyEditing: false
    };
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
    },

    async saveEdits(task) {
      await store.dispatch('updateTask', task);
      this.currentlyEditing = false;
    }
  }
};
</script>
