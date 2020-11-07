<template>
  <div class="sidebar-family">
    <h3>My Kids</h3>
    <ul class="family-list">
      <li
        v-for="(child, index) in getFamily.children"
        :key="index"
        @click="getChildsPages(child.id)"
      >
        {{ child.displayName }}
        <ul v-if="showChild === child.id">
          <li v-for="(page, index) in childsPages" :key="index">
            {{ page.title }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { store } from '../store/store';

export default {
  name: 'SideBarKids',
  data() {
    return {
      showChild: ''
    };
  },
  computed: {
    ...mapGetters(['getFamily', 'childsPages'])
  },
  methods: {
    getChildsPages(id) {
      this.showChild = id;
      store.dispatch('getChildsPages', id);
    }
  }
};
</script>

<style scoped>
.sidebar-family {
  padding-top: 30px;
}
</style>
