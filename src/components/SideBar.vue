<template>
  <nav class="sidebar">
    <h3>My Pages</h3>
    <ul class="page-list">
      <li v-for="(page, index) in pages" :key="index" @click="selectPage(page)">
        {{ page.title }}
      </li>
    </ul>
    <AddNewPage />
    <SideBarKids v-if="currentUserIsParent" />
  </nav>
</template>

<script>
import { store } from '../store/store';
import { mapGetters, mapState } from 'vuex';

import AddNewPage from '../components/AddNewPage';
import SideBarKids from '../components/SideBarKids';

export default {
  name: 'SideBar',
  components: {
    AddNewPage,
    SideBarKids
  },
  computed: {
    ...mapState({
      pages: state => state.pages.pages
    }),
    ...mapGetters(['currentUserIsParent'])
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
