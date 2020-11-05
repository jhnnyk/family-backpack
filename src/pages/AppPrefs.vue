<template>
  <div class="app-prefs container">
    <h1>Settings</h1>
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
  </div>
</template>

<script>
import { firebaseFunc } from '../firebase';

const findUserByEmail = firebaseFunc.httpsCallable('findUserByEmail');

export default {
  name: 'AppPrefs',
  data() {
    return {
      inviteUserEmail: ''
    };
  },
  methods: {
    async findUser() {
      const result = await findUserByEmail({ email: this.inviteUserEmail });
      console.log(result.data);
    }
  }
};
</script>
