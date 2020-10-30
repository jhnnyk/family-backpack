<template>
  <div class="signup-form">
    <h2>Sign Up</h2>
    <form>
      <label for="display_name">Display Name:</label>
      <input
        type="text"
        v-model="displayName"
        id="display_name"
        placeholder="enter display name"
        @focus="clearErrorMessage"
      />
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="enter email"
        v-bind:class="{ danger: hasEmailError }"
        @focus="clearErrorMessage"
      />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="enter password"
        v-bind:class="{ danger: hasPasswordError }"
        @focus="clearErrorMessage"
      />

      <label for="password-confirmation">Confirm password:</label>
      <input
        type="password"
        id="password-confirmation"
        v-model="passwordConfirmation"
        placeholder="please confirm your password"
        v-bind:class="{ danger: hasPasswordError }"
        @focus="clearErrorMessage"
      />

      <p class="feedback">{{ feedback }}</p>

      <button type="button" @click="signUp">Sign up</button>
    </form>
  </div>
</template>

<script>
import { auth } from '../firebase';
import router from '../router';

export default {
  name: 'SignUp',
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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
    async signUp() {
      if (this.password !== this.passwordConfirmation) {
        this.hasPasswordError = true;
        this.feedback = 'Passwords must match';
        return;
      }

      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        await auth.currentUser.updateProfile({ displayName: this.displayName });
        router.push({ name: 'Home' });
      } catch (error) {
        this.feedback = error.message;
        switch (error.code) {
          case 'auth/invalid-email':
            this.hasEmailError = true;
            return;
          case 'auth/weak-password':
            this.hasPasswordError = true;
            return;
          case 'auth/email-already-in-use':
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
