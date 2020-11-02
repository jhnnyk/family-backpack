<template>
  <div class="home">
    <div v-if="getUser">
      Hello {{ getUser.displayName }}! <br />
      <button type="button" @click="signOut">Sign Out</button>
      <NewPageButton />
      <SideBar />
    </div>
    <div v-else>
      <router-link to="/signin">Sign In</router-link>
      or
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { auth } from '../firebase';

import NewPageButton from '../components/NewPageButton';
import SideBar from '../components/SideBar';

export default {
  name: 'Home',
  components: {
    NewPageButton,
    SideBar
  },
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
