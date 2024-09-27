export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}
// export interface Comic extends DataEntity {
//   issueNumber: number;
// }

export type DataEntityMap = {
  movie: Movie;
  song: Song;
  // comic: ComputedEffectTiming;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (id: string) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (arg: DataEntityMap[K]) => DataEntityMap[K];
}

function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== 'undefined'
}
export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap as `${K}s`] : Record<string, DataEntityMap[K]>} = {
    movies: {},
    songs: {}
  }

  getAllSongs(): Song[] {
    return Object.keys(this.#data.songs).map(
      (songKey) => this.#data.songs[songKey]
    ).filter(isDefined);
  }

  getSong(songKey: string): Song {
    const song = this.#data.songs[songKey]
    if (!song) throw new Error(`Could not find a song with id ${songKey}`);
    return song;
  }

  clearSongs(): void {
    this.#data.songs = {}
  }
  
  addSong(song: Song): Song {
    this.#data.songs[song.id] = song;
    return song;
  }

  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movies).map(
      (movieKey) => this.#data.movies[movieKey]
    ).filter(isDefined);
  }

  getMovie(movieKey: string): Movie {
    const Movie = this.#data.movies[movieKey]
    if (!Movie) throw new Error(`Could not find a Movie with id ${movieKey}`);
    return Movie;
  }

  clearMovies(): void {
    this.#data.movies = {}
  }

  addMovie(movie: Movie): Movie {
    this.#data.movies[movie.id] = movie;
    return movie;
  }
}

