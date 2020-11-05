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
        store.dispatch('setFamilyRef', user);
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
  background-color: #f2f6fa;
}

ul,
li {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  border-radius: 6px;
  margin: 5vw;
  background-color: #fff;
  padding: 3vw;
}

.danger {
  border: 1px solid red;
}

p.feedback {
  color: red;
  margin: 5px 0 0 0;
}
</style>
