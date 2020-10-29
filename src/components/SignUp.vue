<template>
  <div class="signup">
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

      <label for="password_confirmation">Confirm password:</label>
      <input
        type="password"
        id="password_confirmation"
        v-model="password_confirmation"
        placeholder="please confirm your password"
      />

      <button type="button" @click="signUp">Sign up</button>
    </form>
  </div>
</template>

<script>
import { auth } from '../firebase';

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: ''
    };
  },
  methods: {
    async signUp() {
      try {
        auth.createUserWithEmailAndPassword(this.email, this.password);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
