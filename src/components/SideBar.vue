<template>
  <nav class="sidebar">
    <h3>Pages</h3>
    <ul v-for="(page, index) in getPages" :key="index" class="page-list">
      <li @click="selectPage(page)">{{ page.title }}</li>
    </ul>
    <NewPageButton />
  </nav>
</template>

<script>
import { store } from '../store/store';
import { mapGetters } from 'vuex';

import NewPageButton from '../components/NewPageButton';

export default {
  name: 'SideBar',
  components: {
    NewPageButton
  },
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
  flex-grow: 1;
}

.page-list li:hover {
  cursor: pointer;
}
</style>
