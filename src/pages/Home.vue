<template>
  <div class="home-wrapper">
    <div class="home" v-if="getUser">
      <SideBar />
      <PageContent />
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
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  border-radius: 6px;
  margin: 5vw;
  background-color: #fff;
}
</style>
