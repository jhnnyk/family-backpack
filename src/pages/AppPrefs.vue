<template>
  <div class="app-prefs container">
    <h1>Settings</h1>
    <hr />
    <div class="family-info" v-if="currentFamily">
      <h2><i class="material-icons">groups</i> {{ currentFamily.name }}</h2>

      <h4>Parents:</h4>
      <ul>
        <li v-for="(parent, index) in currentFamily.parents" :key="index">
          {{ parent.displayName }}
        </li>
      </ul>
      <AddNewParent v-if="currentUserIsParent" />

      <h4>Children:</h4>
      <ul>
        <li v-for="(child, index) in currentFamily.children" :key="index">
          {{ child.displayName }}
        </li>
      </ul>
      <AddNewChild v-if="currentUserIsParent" />
    </div>

    <div class="add-family" v-if="!currentFamily">
      <h2>Create Family</h2>
      <form @submit.prevent>
        <input
          type="text"
          name="family-name"
          id="family-name"
          placeholder="enter family name"
          v-model="newFamilyName"
          :class="{ danger: hasFamilyNameError }"
          @focus="clearErrorMessage"
        />

        <p class="feedback">{{ feedback }}</p>

        <button type="button" @click="createNewFamily">Create family</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { store } from '../store/store';

import AddNewParent from '../components/AddNewParent';
import AddNewChild from '../components/AddNewChild';

export default {
  name: 'AppPrefs',
  components: {
    AddNewParent,
    AddNewChild
  },
  data() {
    return {
      newFamilyName: '',
      hasFamilyNameError: false,
      feedback: ''
    };
  },
  computed: {
    ...mapGetters(['currentFamily', 'currentUserIsParent'])
  },
  methods: {
    clearErrorMessage() {
      this.hasFamilyNameError = false;
      this.feedback = '';
    },

    async createNewFamily() {
      if (!this.newFamilyName) {
        this.hasFamilyNameError = true;
        this.feedback = 'You must enter a name for your family';
        return;
      }

      await store.dispatch('createNewFamily', this.newFamilyName);
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}

h4 {
  margin-top: 15px;
}

ul {
  margin-bottom: 10px;
}

li {
  display: inline;
  border-right: 1px solid #ccc;
  padding: 0 10px;
}

li:last-child {
  border-right: none;
}
</style>
