<template>
  <div class="task-item">
    <div v-if="!currentlyEditing">
      <i v-if="userCanEdit" class="material-icons reorder-handle"
        >drag_handle</i
      >
      <input
        type="checkbox"
        :name="task.id"
        :id="task.id"
        :checked="!!task.completed"
        @click="toggleTaskComplete(task)"
      />
      <label :for="task.id">{{ task.content }}</label>
      <div class="task-admin" v-if="userCanEdit">
        <a @click="currentlyEditing = true" title="edit">
          <i class="material-icons">edit</i>
        </a>
        <a @click="deleteTask(task)" title="delete task">
          <i class="material-icons">delete</i>
        </a>
      </div>
    </div>

    <div v-if="currentlyEditing">
      <input
        type="text"
        v-model="task.content"
        @keydown.enter="saveEdits(task)"
      />
      <div class="task-admin">
        <a @click="saveEdits(task)" title="save changes">
          <i class="material-icons">done</i>
        </a>
        <a @click="currentlyEditing = false" title="undo changes">
          <i class="material-icons">undo</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters(['userCanEdit'])
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
    },

    deleteTask(task) {
      store.dispatch('deleteTask', task);
    }
  }
};
</script>

<style scoped>
.task-item {
  margin: 2px 0;
}

input[type='checkbox'] {
  position: relative;
  top: 2px;
}

label {
  margin: 0 5px;
}

.task-admin {
  display: inline;
}

.task-admin .material-icons {
  font-size: 1em;
}

.reorder-handle {
  font-size: 0.7em;
  cursor: grab;
  color: var(--muted);
}

.reorder-handle:active {
  cursor: grabbing;
}
</style>
