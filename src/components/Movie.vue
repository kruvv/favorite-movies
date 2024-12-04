<template>
  <div class="movie">
    <img :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`" :alt="movie.original_title"
      class="movie-img" />
    <div class="movie-name">
      {{ movie.original_title }} ({{ movie.release }})
    </div>
    <span class="movie-overview">{{ movie.overview }}</span>
    <div class="movie-buttons">
      <button class="btn movie-buttons-watched" @click="movieStore.toggleWatched(movie.id)">
        <span v-if="!movie.isWatched">Watched</span>
        <span v-else>Unwatched</span>
      </button>
      <button class="btn movie-buttons-delete" @click="movieStore.deleteMovie(movie.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "../stores/MovieStore.ts";
const movieStore = useMovieStore();
const props = defineProps({
  movie: {
    type: Object,
    require: true,
    default: () => { },
  },
});
</script>

<style scoped>
.movie {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 30px;
  margin-bottom: 20px;
  border: 2px solid #efefef;
  padding: 10px;
  border-radius: 10px;
}

.movie-accept {
  margin-right: 10px;
}

.movie-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.movie-name {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
