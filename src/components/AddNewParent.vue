<template>
  <div class="add-new-parent">
    <button type="button" v-if="!formVisible" @click="showForm">
      <i class="material-icons">person_add</i> add parent
    </button>
    <SignUp signUpType="Parent" v-if="formVisible" />
  </div>
</template>

<script>
import SignUp from '../pages/SignUp';

export default {
  name: 'AddNewParent',
  components: {
    SignUp
  },
  data() {
    return {
      formVisible: false
    };
  },
  methods: {
    showForm() {
      this.formVisible = true;
    }
  }
};
</script>
