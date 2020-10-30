<template>
  <div class="signin-form">
    <h2>Sign In</h2>
    <form>
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="enter email"
      />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="enter password"
      />

      <button type="button" @click="signIn">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { auth } from '../firebase';
import router from '../router';

export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async signIn() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        router.push({ name: 'Home' });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
