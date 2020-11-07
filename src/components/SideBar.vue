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
    <SideBarKids v-if="currentUserIsParent" />
  </nav>
</template>

<script>
import { store } from '../store/store';
import { mapGetters } from 'vuex';

import AddNewPage from '../components/AddNewPage';
import SideBarKids from '../components/SideBarKids';

export default {
  name: 'SideBar',
  components: {
    AddNewPage,
    SideBarKids
  },
  computed: {
    ...mapGetters(['getPages', 'currentUserIsParent'])
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
