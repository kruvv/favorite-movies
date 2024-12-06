<template>
  <div class="movie">
    <img
      :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
      :alt="movie.original_title"
      class="movie-img"
    />
    <div>
      <div class="movie-name">
        {{ movie.original_title }} ({{ movie.release_date }})
      </div>
      <span class="movie-overview">{{ movie.overview }}</span>
      <div class="movie-buttons" v-if="!isSearch">
        <button
          class="btn movie-buttons-watched"
          @click="movieStore.toggleWatched(movie.id)"
        >
          <span v-if="!movie.isWatched">Watched</span>
          <span v-else>Unwatched</span>
        </button>
        <button
          class="btn movie-buttons-delete"
          @click="movieStore.deleteMovie(movie.id)"
        >
          Delete
        </button>
      </div>
      <div class="movie-buttons" v-else>
        <button
          class="btn btn_green"
          @click="searchStore.addToUserMovies(movie)"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "../stores/MovieStore.ts";
import { useSearchStore } from "../stores/SearchStore.ts";

const movieStore = useMovieStore();
const searchStore = useSearchStore();
const props = defineProps({
  movie: {
    type: Object,
    require: true,
    default: () => {},
  },
  isSearch: {
    type: Boolean,
    require: false,
    default: false,
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
  width: 100%;
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

.btn {
  border: none;
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;
}

.btn:hover {
  opacity: 0.7;
}

.btn_green {
  background: #37df5c;
  color: #efefef;
}

.movie-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.movie-buttons-delete {
  background: #f00;
  color: #efefef;
}

.movie-buttons-watched {
  background: #5dc0e2;
  color: #efefef;
}

.movie-overview {
  display: block;
  margin-bottom: 20px;
}
</style>
