<template>
  <div id="app">
    <TitleBar />
    <router-view></router-view>
  </div>
</template>

<script>
import { auth } from './firebase';
import { store } from './store/store';

import TitleBar from './components/TitleBar';

export default {
  name: 'App',
  components: {
    TitleBar
  },
  created() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        store.dispatch('setUser', user);
      } else {
        store.dispatch('setUser', null);
      }
    });
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 50%;
}

input.danger {
  border: 1px solid red;
}

p.feedback {
  color: red;
  margin: 5px 0 0 0;
}
</style>
