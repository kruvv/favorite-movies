import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore.ts";
import { MovieType } from "./MovieStore.ts";

const URL_API =
  "https://api.themoviedb.org/3/search/movie?api_key=ad433a5055edbcbe820119c8cadcc933&query=";

interface SearchMovie {
  movies: MovieType[];
  loader: Boolean;
}

export const useSearchStore = defineStore("searchStore", {
  state: (): SearchMovie => ({
    movies: [],
    loader: false,
  }),
  actions: {
    async getMovies(search: string) {
      this.loader = true;
      try {
        const res = await fetch(`${URL_API}${search}`);
        const data = await res.json();
        this.movies = data.results;
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },
    addToUserMovies(obj: MovieType) {
      const movieStore = useMovieStore();
      movieStore.movies.push({ ...obj, isWatched: false });
      movieStore.activeTab = 1;
    },
  },
});
