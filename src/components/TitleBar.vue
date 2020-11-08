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
    <div class="signin-signup" v-else>
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
  padding: 10px 20px;
  background-color: var(--blue);
  color: var(--bg-color);
  font-family: 'Pacifico', cursive;
}

div {
  display: inline-flex;
  align-items: center;
}

a {
  color: var(--pink);
  text-decoration: none;
}

.material-icons {
  padding: 0 6px;
}

.signin-signup a {
  margin: 0 5px;
}
</style>
