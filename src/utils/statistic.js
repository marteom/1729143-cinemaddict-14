export const getGenresCounts = (films) => {
  let allGenres = [];
  films.forEach((film) => {
    if(film.watched.already_watched){
      allGenres.push(...film.genres)
    }
  });

  let genresCounts = {};
  allGenres.forEach(function(a){
    genresCounts[a] = genresCounts[a] + 1 || 1;
  });

  return genresCounts;
}