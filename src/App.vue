<template>
  <div id="app">
    <h1>Family Backpack</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import { auth } from './firebase';
import { store } from './store/store';

export default {
  name: 'App',
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
