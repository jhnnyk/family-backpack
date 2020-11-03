<template>
  <header>
    <h1>Family Backpack</h1>
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
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 8px 6px -6px #ccc;
  margin: 0 -10px 10px -10px;
  padding: 0 20px;
}
</style>
