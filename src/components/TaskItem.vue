<template>
  <div class="task-item">
    <input
      type="checkbox"
      :name="task.id"
      :id="task.id"
      :checked="!!task.completed"
      @click="toggleTaskComplete(task)"
    />
    <label :for="task.id">{{ task.content }}</label>
  </div>
</template>

<script>
import { store } from '../store/store';

export default {
  name: 'TaskItem',
  props: {
    task: Object
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
