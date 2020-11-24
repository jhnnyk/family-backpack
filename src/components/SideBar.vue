<template>
  <nav class="sidebar">
    <!-- owner's pages -->
    <h3>My Pages</h3>
    <ul class="page-list">
      <li
        v-for="(page, index) in pages"
        :key="index"
        @click="selectPage(page)"
        :class="[page.id === selectedPageId ? 'selected' : '']"
      >
        {{ page.title }}
      </li>
    </ul>

    <AddNewPage />

    <!-- page invites -->
    <h3>Page Invites</h3>
    <ul class="page-list">
      <li
        v-for="invite in invites"
        :key="invite.id"
        @click="selectPage(invite)"
        :class="[invite.id === selectedPageId ? 'selected' : '']"
      >
        {{ invite.title }}
        <button class="success" type="button" title="Accept Invite">
          <i class="material-icons">add_circle</i>
        </button>
        <button class="danger" type="button" title="Decline Invite">
          <i class="material-icons">delete</i>
        </button>
      </li>
    </ul>

    <!-- kids pages -->
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
      pages: state => state.pages.pages,
      invites: state => state.pages.pageInvites
    }),
    ...mapGetters(['currentUserIsParent', 'selectedPageId'])
  },
  created() {
    store.dispatch('setPagesRef');
    store.dispatch('setPageInvitesRef');
  },
  methods: {
    selectPage(page) {
      store.dispatch('selectPage', page);
    }
  }
};
</script>
