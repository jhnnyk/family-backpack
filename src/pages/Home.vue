<template>
  <div class="home-wrapper container">
    <div class="home" v-if="getUser">
      <SideBar />
      <PageContent />
    </div>
    <div class="welcome" v-else>
      <h1>Welcome to Fubby.app</h1>
      <p>the family hub</p>
      <p>
        <router-link to="/signin">Sign In</router-link>
        or
        <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import PageContent from '../components/PageContent';
import SideBar from '../components/SideBar';

export default {
  name: 'Home',
  components: {
    PageContent,
    SideBar
  },
  computed: {
    ...mapGetters(['getUser'])
  }
};
</script>

<style>
.home {
  display: flex;
  flex-direction: row;
}

.welcome {
  text-align: center;
}
</style>
