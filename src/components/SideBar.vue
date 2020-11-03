<template>
  <nav class="sidebar">
    <h3>Pages</h3>
    <ul class="page-list">
      <li
        v-for="(page, index) in getPages"
        :key="index"
        @click="selectPage(page)"
      >
        {{ page.title }}
      </li>
    </ul>
    <AddNewPage />
  </nav>
</template>

<script>
import { store } from '../store/store';
import { mapGetters } from 'vuex';

import AddNewPage from '../components/AddNewPage';

export default {
  name: 'SideBar',
  components: {
    AddNewPage
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

.page-list {
  margin: 15px 0;
}

.page-list li {
  list-style-type: none;
}

.page-list li:hover {
  cursor: pointer;
}
</style>
