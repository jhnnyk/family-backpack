<template>
  <div class="home">
    <div v-if="getUser">
      {{ getUser.email }} <br />
      <button type="button" @click="signOut">Sign Out</button>
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

export default {
  name: 'Home',
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
