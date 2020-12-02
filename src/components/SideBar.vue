<template>
  <nav class="sidebar">
    <h3>My Pages</h3>
    <ul class="page-list">
      <!-- owner's pages -->
      <li
        v-for="(page, index) in pages"
        :key="index"
        @click="selectPage(page)"
        :class="[page.id === selectedPageId ? 'selected' : '']"
      >
        <a>{{ page.title }}</a>
      </li>

      <!-- collab pages -->
      <li
        v-for="page in collabPages"
        :key="page.id"
        @click="selectPage(page)"
        :class="[page.id === selectedPageId ? 'selected' : '']"
        class="collab"
      >
        <a>{{ page.title }} <i class="material-icons">group</i></a>
      </li>

      <!-- page invites -->
      <li
        v-for="invite in invites"
        :key="invite.id"
        @click="selectPage(invite)"
        :class="[invite.id === selectedPageId ? 'selected' : '']"
        class="invite"
      >
        <span>Invite:</span> <a>{{ invite.title }}</a>
        <button
          class="success"
          type="button"
          title="Accept Invite"
          @click="acceptInvite(invite)"
        >
          <i class="material-icons">add_circle</i>
        </button>
        <button
          class="danger"
          type="button"
          title="Decline Invite"
          @click="declineInvite(invite)"
        >
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
      invites: state => state.pages.pageInvites,
      collabPages: state => state.pages.collabPages
    }),
    ...mapGetters(['currentUserIsParent', 'selectedPageId'])
  },
  created() {
    store.dispatch('setPagesRef');
    store.dispatch('setPageInvitesRef');
    store.dispatch('setCollabPagesRef');
  },
  methods: {
    selectPage(page) {
      store.dispatch('selectPage', page);
    },

    acceptInvite(page) {
      store.dispatch('acceptInvite', page);
    },

    declineInvite(page) {
      store.dispatch('declineInvite', page);
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

.sidebar li.invite span {
  text-transform: uppercase;
  font-size: 0.6em;
  font-weight: bold;
}

.sidebar li.collab .material-icons {
  font-size: 0.9em;
}
</style>
