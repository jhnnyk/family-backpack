<template>
  <div class="add-new-child">
    <button type="button" v-if="!formVisible" @click="showForm">
      <i class="material-icons">person_add</i> add child
    </button>
    <SignUp signUpType="Child" v-if="formVisible" />
  </div>
</template>

<script>
import SignUp from '../pages/SignUp';

export default {
  name: 'AddNewChild',
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
