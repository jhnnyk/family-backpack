<template>
  <div class="app-prefs container">
    <h1>Settings</h1>
    <hr />
    <div class="family-info" v-if="getFamily">
      <h3>{{ getFamily.name }}</h3>
      <hr />
    </div>

    <div class="add-family" v-if="!getFamily">
      <h3>Create Family</h3>
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
      <hr />
    </div>
    <h3>Search for user by email</h3>
    <p>this doesn't really serve a purpose right now -- just testing</p>
    <form @submit.prevent>
      <input
        type="email"
        name="email"
        id="email"
        v-model="inviteUserEmail"
        placeholder="enter email"
      />
      <button type="button" @click="findUser">Search for user</button>
    </form>
    <p v-if="loading">loading...</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { firebaseFunc } from '../firebase';
import { store } from '../store/store';

const findUserByEmail = firebaseFunc.httpsCallable('findUserByEmail');

export default {
  name: 'AppPrefs',
  data() {
    return {
      newFamilyName: '',
      hasFamilyNameError: false,
      feedback: '',
      loading: false,
      inviteUserEmail: ''
    };
  },
  computed: {
    ...mapGetters(['getFamily'])
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
    },

    async findUser() {
      this.loading = true;
      const result = await findUserByEmail({ email: this.inviteUserEmail });
      this.loading = false;
      console.log(result.data);
    }
  }
};
</script>
