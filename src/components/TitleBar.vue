<template>
  <header>
    <h1>Fubby</h1>
    <div v-if="getUser">
      Hello {{ getUser.displayName }}! <br />
      <button type="button" @click="signOut">Sign Out</button>
    </div>
    <div v-else>
      <router-link to="/signin">Sign In</router-link>
      or
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { auth } from '../firebase';

export default {
  name: 'TitleBar',
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    async signOut() {
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
  padding: 0 20px;
  background-color: #fff;
}
</style>
