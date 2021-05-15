export const getGenresCounts = (films) => {
  const allGenres = [];
  films.forEach((film) => {
    if(film.watched.already_watched){
      allGenres.push(...film.genres);
    }
  });

  const genresCounts = {};
  allGenres.forEach((a)=> {
    genresCounts[a] = genresCounts[a] + 1 || 1;
  });

  return genresCounts;
};
