<template>
  <div class="page-admin">
    <i
      class="material-icons"
      @click="showPageSettings = true"
      v-if="!showPageSettings"
      >settings</i
    >

    <div class="page-settings" v-if="showPageSettings">
      {{ selectedPage.title }}
      <i class="material-icons" @click="showPageSettings = false">close</i>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PageAdmin',
  data() {
    return {
      showPageSettings: false
    };
  },
  computed: {
    ...mapState({
      selectedPage: state => state.pages.selectedPage
    })
  }
};
</script>

<style scoped>
.page-admin {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
