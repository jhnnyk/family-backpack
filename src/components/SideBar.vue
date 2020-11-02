<template>
  <div class="sidebar">
    <h4>sidebar here</h4>
    <ul v-for="(page, index) in getPages" :key="index">
      <li>{{ page.title }}</li>
    </ul>
  </div>
</template>

<script>
import { store } from '../store/store';
import { mapGetters } from 'vuex';

export default {
  name: 'SideBar',
  computed: {
    ...mapGetters(['getPages'])
  },
  created() {
    store.dispatch('setPagesRef');
  }
};
</script>
