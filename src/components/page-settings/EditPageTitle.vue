<template>
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
</template>

<script>
import { mapState } from 'vuex';
import { store } from '../../store/store';

export default {
  name: 'EditPageTitle',
  data() {
    return {
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
