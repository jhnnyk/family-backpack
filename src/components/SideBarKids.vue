<template>
  <div class="sidebar-family">
    <h3>My Kids</h3>
    <ul class="family-list">
      <li
        v-for="(child, index) in currentFamily.children"
        :key="index"
        @click="getChildsPages(child.id)"
      >
        {{ child.displayName }}
        <ul class="childs-pages" v-if="showChild === child.id">
          <li
            v-for="(page, index) in childsPages"
            :key="index"
            @click="selectPage(page)"
            :class="[page.id === selectedPageId ? 'selected' : '']"
          >
            <a>{{ page.title }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { store } from '../store/store';

export default {
  name: 'SideBarKids',
  data() {
    return {
      showChild: ''
    };
  },
  computed: {
    ...mapState({
      childsPages: state => state.pages.childsPages
    }),
    ...mapGetters(['currentFamily', 'selectedPageId'])
  },
  methods: {
    getChildsPages(id) {
      this.showChild = id;
      store.dispatch('getChildsPages', id);
    },

    selectPage(page) {
      store.dispatch('selectPage', page);
    }
  }
};
</script>

<style scoped>
.childs-pages {
  margin-left: 15px;
}
</style>
