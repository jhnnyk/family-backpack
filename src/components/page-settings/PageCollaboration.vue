<template>
  <div class="page-collaboration">
    Collaborators:

    <input
      type="text"
      placeholder="Enter email"
      v-model="invitedUserEmail"
      @keydown.enter="inviteCollaborator"
      @focus="clearErrorMessage"
    />
    <p v-if="feedback" class="feedback">{{ feedback }}</p>

    <button v-if="loading" disabled>
      <img src="../../assets/30.svg" alt="loading" />
    </button>
    <button v-else type="button" @click="inviteCollaborator">
      <i class="material-icons">person_add</i> Invite User
    </button>
  </div>
</template>

<script>
import { firebaseFunc } from '../../firebase';
import { store } from '../../store/store';

const findUserByEmail = firebaseFunc.httpsCallable('findUserByEmail');

export default {
  name: 'PageCollaboration',
  data() {
    return {
      invitedUserEmail: '',
      feedback: '',
      loading: false
    };
  },
  methods: {
    clearErrorMessage() {
      this.feedback = '';
    },

    async inviteCollaborator() {
      this.loading = true;
      const result = await findUserByEmail({ email: this.invitedUserEmail });
      // user found
      if (result.data.uid) {
        await store.dispatch('inviteCollaborator', result.data.email);
        this.invitedUserEmail = '';
      }

      // handle errors
      if (result.data.errorInfo) {
        this.feedback = result.data.errorInfo.message;
      }

      this.loading = false;
    }
  }
};
</script>
