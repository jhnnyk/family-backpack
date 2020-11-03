<template>
  <main class="page-content">
    <h2>Page Content Here...</h2>
    <NewPageButton />
  </main>
</template>

<script>
import NewPageButton from '../components/NewPageButton';

export default {
  name: 'PageContent',
  components: {
    NewPageButton
  }
};
</script>

<style>
.page-content {
  flex-grow: 3;
  background-color: #ccc;
  padding: 20px;
}
</style>
