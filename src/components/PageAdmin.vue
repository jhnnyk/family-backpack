<template>
  <div class="page-admin">
    <i
      class="material-icons"
      @click="showPageSettings = true"
      v-if="!showPageSettings"
      >settings</i
    >

    <div class="page-settings" v-if="showPageSettings">
      <h4>Page Settings</h4>
      <i class="material-icons close" @click="showPageSettings = false">
        close
      </i>

      <div class="title-setting">
        Title:
        <div v-if="!editingPageTitle">
          <strong>{{ selectedPage.title }}</strong>
          <i class="material-icons" @click="editPageTitle">edit</i>
        </div>

        <div v-if="editingPageTitle">
          <input type="text" v-model="selectedPage.title" />
          <i class="material-icons save" @click="savePageTitle">done</i>
          <i class="material-icons cancel" @click="cancelEditPageTitle">undo</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { store } from '../store/store';

export default {
  name: 'PageAdmin',
  data() {
    return {
      showPageSettings: false,
      editingPageTitle: false,
      pageTitleCache: ''
    };
  },
  computed: {
    ...mapState({
      selectedPage: state => state.pages.selectedPage
    })
  },
  methods: {
    editPageTitle() {
      this.pageTitleCache = this.selectedPage.title;
      this.editingPageTitle = true;
    },

    cancelEditPageTitle() {
      this.selectedPage.title = this.pageTitleCache;
      this.editingPageTitle = false;
    },

    savePageTitle() {
      store.dispatch('updatePageTitle', this.selectedPage.title);
      this.editingPageTitle = false;
    }
  }
};
</script>

<style scoped>
.page-admin {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--bg-color);
  z-index: 2;
}

.page-settings {
  border: 1px solid var(--blue);
  border-radius: 5px;
  padding: 15px;
  width: 250px;
}

.material-icons {
  color: var(--muted);
}

.material-icons:hover {
  cursor: pointer;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
}

.title-setting .material-icons {
  font-size: 0.8em;
  padding-left: 3px;
}

.title-setting div {
  display: inline;
}

.save {
  color: var(--green);
}

.cancel {
  color: var(--pink);
}
</style>
