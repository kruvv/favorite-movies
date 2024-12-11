import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
type Movie = {
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  isWatched: boolean;
  id: string | number;
};
export type MovieType = Partial<Movie>;

// export const useMovieStore = defineStore("movieStore", {
//   state: () => ({
//     movies: [] as MovieType[],
//     activeTab: 2 as number,
//   }),
//   getters: {
//     watchedMovies(): MovieType[] {
//       return this.movies.filter((movie) => movie.isWatched);
//     },
//     totalCountMovies(state) {
//       return state.movies.length;
//     },
//   },
//   actions: {
//     setActiveTab(id: number) {
//       this.activeTab = id;
//     },
//     toggleWatched(id: number) {
//       const idx = this.movies.findIndex((el) => el.id == id);
//       this.movies[idx].isWatched = !this.movies[idx].isWatched;
//     },
//     deleteMovie(id: number) {
//       this.movies = this.movies.filter((el) => el.id != id);
//     },
//   },
// });
//
export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref<MovieType[]>([]);
  const activeTab = ref<Number>(2);

  const moviesInLocalStorage = localStorage.getItem("movies");
  if (moviesInLocalStorage) {
    movies.value = JSON.parse(moviesInLocalStorage);
  }

  const watchedMovies = computed(() => {
    return movies.value.filter((el: MovieType) => el.isWatched);
  });

  const totalCountMovies = computed(() => {
    return movies.value.length;
  });

  const setActiveTab = (id: number) => {
    activeTab.value = id;
  };
  const toggleWatched = (id: number) => {
    const idx = movies.value.findIndex((el: MovieType) => el.id == id);
    movies.value[idx].isWatched = !movies.value[idx].isWatched;
  };
  const deleteMovie = (id: number) => {
    movies.value = movies.value.filter((el: MovieType) => el.id != id);
  };
  watch(
    () => movies,
    (state) => {
      if ("_value" in state) {
        localStorage.setItem("movies", JSON.stringify(state._value));
      }
    },
    { deep: true },
  );

  return {
    movies,
    activeTab,
    watchedMovies,
    totalCountMovies,
    setActiveTab,
    toggleWatched,
    deleteMovie,
  };
});
