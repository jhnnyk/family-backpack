<template>
  <header>
    <h1><router-link to="/">Fubby</router-link></h1>
    <div v-if="currentUser">
      Hello {{ currentUser.displayName }}!
      <router-link to="/settings">
        <i class="material-icons">settings</i>
      </router-link>
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
import { mapState } from 'vuex';
import { auth } from '../firebase';
import router from '../router';
import { store } from '../store/store';

export default {
  name: 'TitleBar',
  computed: {
    ...mapState({
      currentUser: state => state.users.user
    })
  },
  methods: {
    async signOut() {
      try {
        await auth.signOut();
        store.dispatch('clearSelectedPage');

        if (this.$route.path !== '/') {
          router.push({ name: 'Home' });
        }
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
  align-items: center;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
  padding: 0 20px;
  background-color: #fff;
}
</style>
