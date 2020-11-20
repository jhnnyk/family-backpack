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
:root {
  --bg-color: #fff9eb; /* "Old Lace" Coolors.co */
  --font-color: #073b4c; /* "Midnight Green Eagle Green" Coolors.co */
  --pink: #ef436b; /* "Paradise Pink" Coolors.co */
  --green: #06d6a0; /* "Caribbean Green" Coolors.co */
  --blue: #118ab2; /* "Blue NCS" Coolors.co */
  --muted: #aaa;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
  color: var(--font-color);
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
ul,
li {
  margin: 0;
  padding: 0;
}

a {
  color: var(--blue);
  text-decoration: none;
}

a:hover {
  cursor: pointer;
  text-decoration: underline;
}

li.selected {
  color: var(--green);
  font-weight: bold;
}

button {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--blue);
  border-radius: 7px;
  background-color: white;
  padding: 3px 5px;
}

button .material-icons {
  margin-right: 5px;
}

input[type='checkbox']:checked + label {
  text-decoration: line-through;
  color: var(--muted);
}

.container {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  border-radius: 6px;
  margin: 5vw;
  background-color: var(--bg-color);
  padding: 3vw;
  position: relative;
}

.loading-container {
  background-color: rgba(200, 200, 200, 0.5);
  position: absolute;
  padding: 50px;
}

.loading {
  border: 16px solid #999; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.danger {
  border: 1px solid red;
}

p.feedback {
  color: red;
  margin: 5px 0 0 0;
}

.sidebar {
  width: 25%;
}

.sidebar ul {
  margin-bottom: 15px;
}

.sidebar li {
  list-style-type: none;
}

.sidebar li:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
