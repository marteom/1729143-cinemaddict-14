import Observer from '../utils/observer.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films.slice();
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        title: film.film_info.title,
        poster: film.film_info.poster,
        country: film.film_info.release.release_country,
        description: film.film_info.description,
        raiting: film.film_info.total_rating,
        duration: film.film_info.runtime,
        genres: film.film_info.genre,
        isWatchList: film.user_details.watchlist,
        watched: {
          alreadyWatched: film.user_details.already_watched,
          watchingDate: film.user_details.watching_date,
        },
        isFavorite: film.user_details.favorite,
        detailsAge: film.film_info.age_rating,
        director: film.film_info.director,
        actors: film.film_info.actors,
        writers: film.film_info.writers,
        releaseDate: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
      },
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'id': film.id,
        'comments': film.comments,
        'film_info': {
          'title': film.title,
          'alternative_title': film.title,
          'total_rating': film.raiting,
          'poster': film.poster,
          'age_rating': film.detailsAge,
          'director': film.director,
          'writers': film.writers,
          'actors': film.actors,
          'release': {
            'date': film.releaseDate instanceof Date ? film.releaseDate.toISOString() : null,
            'release_country': film.country,
          },
          'runtime': film.duration,
          'genre': film.genres,
          'description': film.description,
        },
        'user_details': {
          'watchlist': film.isWatchList,
          'already_watched': film.watched.alreadyWatched,
          'watching_date': film.watched.watchingDate instanceof Date ? film.watched.watchingDate.toISOString() : null,
          'favorite': film.isFavorite,
        },
      },
    );

    delete adaptedFilm.title;
    delete adaptedFilm.actors;
    delete adaptedFilm.country;
    delete adaptedFilm.description;
    delete adaptedFilm.detailsAge;
    delete adaptedFilm.director;
    delete adaptedFilm.duration;
    delete adaptedFilm.genres;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.isWatchList;
    delete adaptedFilm.poster;
    delete adaptedFilm.raiting;
    delete adaptedFilm.releaseDate;
    delete adaptedFilm.watched;
    delete adaptedFilm.writers;

    return adaptedFilm;
  }

}
