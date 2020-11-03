<template>
  <main class="page-content">
    <h2>Page Content Here...</h2>
    {{ getSelectedPage }}
    <NewPageButton />
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

import NewPageButton from '../components/NewPageButton';

export default {
  name: 'PageContent',
  components: {
    NewPageButton
  },
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
