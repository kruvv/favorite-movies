<template>
  <header class="header">
    <!-- <img src="/logo.svg" alt="logo" class="header-logo" /> -->
    <h2>My Favorites Movies</h2>
  </header>
  <div class="movies">{{ movieStore.movies }}</div>
</template>

<script setup lang="ts">
import { useMovieStore } from "./stores/MovieStore.ts";
const movieStore = useMovieStore();
</script>

<style scoped></style>
