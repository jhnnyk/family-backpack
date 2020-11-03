<template>
  <nav class="sidebar">
    <h3>Pages</h3>
    <ul v-for="(page, index) in getPages" :key="index" class="page-list">
      <li @click="selectPage(page)">{{ page.title }}</li>
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
  },
  methods: {
    selectPage(page) {
      store.dispatch('selectPage', page);
    }
  }
};
</script>

<style>
.sidebar {
  background-color: white;
  flex-grow: 1;
  padding: 20px;
}

.page-list li:hover {
  cursor: pointer;
}
</style>
