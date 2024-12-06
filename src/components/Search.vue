<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input
      type="text"
      class="search-input"
      placeholder="Input movie"
      v-model="searchMovie"
    />
  </form>
  <Loader v-if="searchStore.loader" />
  <div v-else>
    <Movie
      v-for="movie of searchStore.movies"
      :key="movie.id"
      :movie="movie"
      :is-search="true"
    />
    <output></output>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Loader from "../components/Loader.vue";
import Movie from "../components/Movie.vue";
import { useSearchStore } from "../stores/SearchStore.ts";

const searchStore = useSearchStore();
const searchMovie = ref("");
</script>

<style scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin: 20px 0;
  border-radius: 10px;
}
</style>
