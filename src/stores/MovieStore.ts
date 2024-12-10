import { defineStore } from "pinia";
import { ref, computed, watch, watchEffect } from "vue";
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
//     movies: [
//       // {
//       //   adult: false,
//       //   backdrop_path: "/zVVYFN9OjiSn43RVYrzgCOu7y6r.jpg",
//       //   genre_ids: [18, 9648, 53],
//       //   id: 9613,
//       //   original_language: "en",
//       //   original_title: "Spider",
//       //   overview:
//       //     "A mentally disturbed man takes residence in a halfway house. His mind gradually slips back into the realm created by his illness, where he replays a key part of his childhood.",
//       //   popularity: 16.367,
//       //   poster_path: "/zvm4WuYxTiGkRagRqHUey0meRQL.jpg",
//       //   release_date: "2002-11-06",
//       //   title: "Spider",
//       //   video: false,
//       //   vote_average: 6.64,
//       //   vote_count: 849,
//       // },
//       // {
//       //   adult: false,
//       //   backdrop_path: "/f99HWL82rx25jOiVE5jo5qA6OjF.jpg",
//       //   genre_ids: [18, 35],
//       //   id: 55825,
//       //   original_language: "en",
//       //   original_title: "Spider",
//       //   overview:
//       //     "A young man tries to make things right again in his relationship after he and his girlfriend get in a fight.",
//       //   popularity: 5.481,
//       //   poster_path: "/97jePhTnH2pHBh4nPfH5aapOsX0.jpg",
//       //   release_date: "2007-06-17",
//       //   title: "Spider",
//       //   video: false,
//       //   vote_average: 6.559,
//       //   vote_count: 118,
//       // },
//     ] as MovieType[],
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
      localStorage.setItem("movies", JSON.stringify(state._value));
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
