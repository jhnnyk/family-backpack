<template>
  <nav class="sidebar">
    <h3>Pages</h3>
    <ul v-for="(page, index) in getPages" :key="index">
      <li>{{ page.title }}</li>
    </ul>
  </nav>
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

<style>
.sidebar {
  background-color: white;
  flex-grow: 1;
  padding: 20px;
}
</style>
