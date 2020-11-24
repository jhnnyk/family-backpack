<template>
  <div class="page-collaboration">
    Collaborators:

    <input
      type="text"
      placeholder="Enter email"
      v-model="invitedUserEmail"
      @keydown.enter="inviteCollaborator"
    />
    <button type="button" @click="inviteCollaborator">
      <img v-if="loading" src="../../assets/30.svg" alt="loading" />
      <span v-else> <i class="material-icons">person_add</i> Invite User </span>
    </button>
  </div>
</template>

<script>
import { firebaseFunc } from '../../firebase';

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
    async inviteCollaborator() {
      this.loading = true;
      const result = await findUserByEmail({ email: this.invitedUserEmail });
      console.log(result);
      this.loading = false;
    }
  }
};
</script>
