<template>
  <div class="signin-form container">
    <h2>Sign In</h2>
    <form @keydown.enter="signIn">
      <label for="email">Email: </label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="enter email"
        :class="{ danger: hasEmailError }"
        @focus="clearErrorMessage"
      /><br />

      <label for="password">Password: </label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="enter password"
        :class="{ danger: hasPasswordError }"
        @focus="clearErrorMessage"
      />

      <p class="feedback">{{ feedback }}</p>

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
      password: '',
      hasPasswordError: false,
      hasEmailError: false,
      feedback: ''
    };
  },
  methods: {
    clearErrorMessage() {
      this.hasEmailError = false;
      this.hasPasswordError = false;
      this.feedback = '';
    },

    async signIn() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        router.push({ name: 'Home' });
      } catch (error) {
        this.feedback = error.message;
        switch (error.code) {
          case 'auth/invalid-email':
            this.hasEmailError = true;
            return;
          case 'auth/wrong-password':
            this.hasPasswordError = true;
            return;
          case 'auth/user-not-found':
            this.hasEmailError = true;
            return;
          default:
            this.hasEmailError = false;
            this.hasPasswordError = false;
            this.feedback = `${error.code}: ${error.message}`;
            return;
        }
      }
    }
  }
};
</script>
