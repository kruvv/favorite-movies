import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore.ts";
import { MovieType } from "./MovieStore.ts";
import { ref } from "vue";

const URL_API = `${import.meta.env.VITE_BASE_URL_API}${import.meta.env.VITE_API_KEY}&query=`;

// interface SearchMovie {
//   movies: MovieType[];
//   loader: Boolean;
// }

/** Options API*/
// export const useSearchStore = defineStore("searchStore", {
//   state: (): SearchMovie  => ({
//     movies: [],
//     loader: false,
//   }),
//   actions: {
//     async getMovies(search: string) {
//       this.loader = true;
//       try {
//         const res = await fetch(`${URL_API}${search}`);
//         const data = await res.json();
//         this.movies = data.results;
//       } catch (err) {
//         console.log(err);
//       } finally {
//         this.loader = false;
//       }
//     },
//     addToUserMovies(obj: MovieType) {
//       const movieStore = useMovieStore();
//       movieStore.movies.push({ ...obj, isWatched: false });
//       movieStore.activeTab = 1;
//     },
//   },
// });

/** Composition API */
export const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const movies = ref([]);

  const getMovies = async (search: string) => {
    loader.value = true;
    try {
      const res = await fetch(`${URL_API}${search}`);
      const data = await res.json();
      movies.value = data.results;
    } catch (err) {
      console.log(err);
    } finally {
      loader.value = false;
    }
  };
  const addToUserMovies = (obj: MovieType) => {
    const movieStore = useMovieStore();
    movieStore.movies.push({ ...obj, isWatched: false });
    movieStore.activeTab = 1;
  };

  return {
    loader,
    movies,
    getMovies,
    addToUserMovies,
  };
});
