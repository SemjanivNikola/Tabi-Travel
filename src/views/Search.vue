<template>
  <div class="search">
    <h1>HELLO SEARCH</h1>
    <router-link :to="{ path: './views/WelcomeTraveler' }">Go to WelcomeTraveler</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Search'
  }
</script>

<style>
  .search{
    border: 2px solid black;
    background-color: #2E8B57;
    color: #000;
  }

</style>
