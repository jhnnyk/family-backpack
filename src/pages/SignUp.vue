<template>
  <div class="signup-form container">
    <h2>Sign Up</h2>
    <form>
      <label for="display_name">Display Name: </label>
      <input
        type="text"
        v-model="displayName"
        id="display_name"
        placeholder="enter display name"
        @focus="clearErrorMessage"
      /><br />

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
      /><br />

      <label for="password-confirmation">Confirm password: </label>
      <input
        type="password"
        id="password-confirmation"
        v-model="passwordConfirmation"
        placeholder="please confirm your password"
        :class="{ danger: hasPasswordError }"
        @focus="clearErrorMessage"
      /><br />

      <p class="feedback">{{ feedback }}</p>

      <button type="button" @click="signUp">Sign up</button>
    </form>
  </div>
</template>

<script>
import { auth, db } from '../firebase';
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
        const { user } = await auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );

        const userRef = db.doc(`users/${user.uid}`);
        const snapShot = await userRef.get();

        if (!snapShot.exists) {
          await userRef.set({
            displayName: this.displayName,
            email: user.email
          });
        }

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
