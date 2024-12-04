import { defineStore } from "pinia";
type Movie = {
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  isWatched: boolean;
  id: string | number;
};
type MovieType = Partial<Movie>;
export const useMovieStore = defineStore("movieStore", {
  state: () => ({
    movies: [] as MovieType[],
    activeTab: 1 as number,
  }),
  getters: {
    watchedMovies(): MovieType[] {
      return this.movies.filter((movie) => movie.isWatched);
    },
    totalCountMovies(state) {
      return state.movies.length;
    },
  },
  actions: {
    setActiveTab(id: number) {
      this.activeTab = id;
    },
    toggleWatched(id: number) {
      const idx = this.movies.findIndex((el) => el.id == id);
      this.movies[idx].isWatched = !this.movies[idx].isWatched;
    },
    deleteMovie(id: number) {
      this.movies = this.movies.splice(id, 1);
    },
  },
});
