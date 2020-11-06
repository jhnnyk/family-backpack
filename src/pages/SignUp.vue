<template>
  <div class="signup-form container">
    <h2>{{ signUpType ? `Add New ${signUpType}` : 'Sign Up' }}</h2>
    <form @keydown.enter="signUp">
      <label for="display_name">Display Name: </label>
      <input
        type="text"
        id="display_name"
        v-model="displayName"
        placeholder="enter display name"
        :class="{ danger: hasDisplayNameError }"
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
import { auth, db, firebaseFunc } from '../firebase';
import router from '../router';

const addNewParent = firebaseFunc.httpsCallable('addNewParent');

export default {
  name: 'SignUp',
  props: {
    signUpType: String
  },
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      hasPasswordError: false,
      hasEmailError: false,
      hasDisplayNameError: false,
      feedback: ''
    };
  },
  methods: {
    clearErrorMessage() {
      this.hasEmailError = false;
      this.hasPasswordError = false;
      this.hasDisplayNameError = false;
      this.feedback = '';
    },

    signUp() {
      if (this.password !== this.passwordConfirmation) {
        this.hasPasswordError = true;
        this.feedback = 'Passwords must match';
        return;
      }

      if (!this.displayName) {
        this.hasDisplayNameError = true;
        this.feedback = 'Display Name is required';
        return;
      }

      if (this.signUpType) {
        this.signUpNewParent();
      } else {
        this.signUpNewUser();
      }
    },

    async signUpNewUser() {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );

        this.setUserDoc(user);

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
    },

    async signUpNewParent() {
      const newParent = {
        email: this.email,
        password: this.password,
        displayName: this.displayName
      };

      try {
        const user = await addNewParent(newParent);
        this.setUserDoc(user.data);
      } catch (error) {
        console.log(error);
      }
    },

    async setUserDoc(user) {
      const userRef = db.doc(`users/${user.uid}`);
      const snapShot = await userRef.get();

      if (!snapShot.exists) {
        await userRef.set({
          displayName: this.displayName,
          email: user.email
        });
      }
    }
  }
};
</script>
