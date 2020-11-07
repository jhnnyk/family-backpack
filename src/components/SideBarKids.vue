<template>
  <div class="sidebar-family">
    <h3>My Kids</h3>
    <ul class="family-list">
      <li v-for="(child, index) in getFamily.children" :key="index">
        {{ child.displayName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SideBarKids',
  computed: {
    ...mapGetters(['getFamily'])
  }
};
</script>

<style scoped>
.sidebar-family {
  padding-top: 30px;
}
</style>
