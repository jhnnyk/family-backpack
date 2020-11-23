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

      <EditPageTitle />
    </div>
  </div>
</template>

<script>
import EditPageTitle from '../components/page-settings/EditPageTitle';

export default {
  name: 'PageAdmin',
  components: {
    EditPageTitle
  },
  data() {
    return {
      showPageSettings: false
    };
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
</style>
