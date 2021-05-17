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
    //console.log('film: ', film);
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        title: film.film_info.title,//
        poster: film.film_info.poster,//
        country: film.film_info.release.release_country, //
        description: film.film_info.description, //
        raiting: film.film_info.total_rating,//
        bornYear: 2222, //getRandomInteger(1930, 2000),
        duration: film.film_info.runtime,//
        genres: film.film_info.genre,//
        isWatchList: film.user_details.watchlist,//
        watched: film.user_details.already_watched,//
        isFavorite: film.user_details.favorite,//
        detailsAge: film.film_info.age_rating,//
        //watching_date: film.user_details.watching_date,//
        director: film.film_info.director,
        actors: film.film_info.actors,
        writers: film.film_info.writers,
        releaseDate: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date, //

        // dueDate: film.due_date !== null ? new Date(film.due_date) : film.due_date, // На клиенте дата хранится как экземпляр Date
        // isArchive: film.is_archived,
        // isFavorite: film.is_favorite,
        // repeating: film.repeating_days,
      },
    );

    // // Ненужные ключи мы удаляем
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    console.log('adaptedFilm: ', adaptedFilm);

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        "titles": film.title,
        "release_country": film.country,
        "total_rating": film.raiting,
        //bornYear: 2222, //getRandomInteger(1930, 2000),
        "runtime": film.duration,
        "genre": film.genres,
        "age_rating": film.detailsAge,
        "release": {
          "date": film.releaseDate instanceof Date ? film.releaseDate.toISOString() : null,
          "release_country": film.country,
        },
        "user_details": {
          "watchlist": film.isWatchList,
          "already_watched": film.watched,
          "watching_date": film.watching_date instanceof Date ? film.watching_date.toISOString() : null,
          "favorite": film.isFavorite
        },
      },
    );

    // Ненужные ключи мы удаляем
    // delete adaptedTask.dueDate;
    // delete adaptedTask.isArchive;
    // delete adaptedTask.isFavorite;
    // delete adaptedTask.repeating;

    return adaptedFilm;
  }

}
