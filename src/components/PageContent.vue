<template>
  <main class="page-content">
    <h2>Page Content Here...</h2>
    {{ getSelectedPage }}
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageContent',
  computed: {
    ...mapGetters(['getSelectedPage'])
  }
};
</script>

<style>
.page-content {
  flex-grow: 3;
  background-color: #ccc;
  padding: 20px;
}
</style>
