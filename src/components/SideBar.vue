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
        <a>{{ page.title }}</a>
      </li>

      <li
        v-for="invite in invites"
        :key="invite.id"
        @click="selectPage(invite)"
        :class="[invite.id === selectedPageId ? 'selected' : '']"
        class="invite"
      >
        <a>{{ invite.title }}</a>
        <button class="success" type="button" title="Accept Invite">
          <i class="material-icons">add_circle</i>
        </button>
        <button class="danger" type="button" title="Decline Invite">
          <i class="material-icons">delete</i>
        </button>
      </li>
      <li>
        <AddNewPage />
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

<style>
.sidebar {
  width: 25%;
}

.sidebar h3 {
  color: var(--blue);
  font-size: 0.9em;
  margin: 5px 0;
  text-transform: uppercase;
}

.sidebar ul.page-list {
  margin-bottom: 20px;
}

.sidebar li {
  cursor: pointer;
  list-style-type: none;
  margin-left: 10px;
}

.sidebar li a {
  color: var(--font-color);
}

.sidebar li.selected a {
  color: var(--green);
  font-weight: bold;
}

.sidebar li.invite button {
  margin-left: 5px;
}
</style>
