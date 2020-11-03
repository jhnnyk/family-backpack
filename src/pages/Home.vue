<template>
  <div class="home-wrapper container">
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
}
</style>
