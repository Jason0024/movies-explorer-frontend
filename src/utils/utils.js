function filterMovieDuration(movies) {
  // Максимальная длительность короткометражных фильмов в минутах.
  const MAX_SHORT_DURATION = 40;
  // Используем метод filter для отбора фильмов с длительностью меньше значения MAX_SHORT_DURATION.
  const shortMovies = movies.filter((movie) => movie.duration < MAX_SHORT_DURATION);
  // Возвращаем новый массив shortMovies, содержащий только короткометражные фильмы.
  return shortMovies;
}
function filterMoviesByTitle(movies, titleQuery) {
  const moviesByTitle = movies.filter((movie) => {
    // Приводим название фильма на русском языке к нижнему регистру и удаляем лишние пробелы.
    const movieTitleRu = String(movie.nameRU).toLowerCase().trim();
    // Приводим название фильма на английском языке к нижнему регистру и удаляем лишние пробелы.
    const movieTitleEn = String(movie.nameEN).toLowerCase().trim();
    // Приводим поисковый запрос пользователя к нижнему регистру и удаляем лишние пробелы.
    const userQuery = titleQuery.toLowerCase().trim();
    // Возвращаем true, если хотя бы одно из названий фильмов (на русском или английском) содержит поисковый запрос пользователя.
    return movieTitleRu.indexOf(userQuery) !== -1 || movieTitleEn.indexOf(userQuery) !== -1;
  });

  return moviesByTitle; // Возвращаем отфильтрованный массив фильмов.
}
// Конвертация длительности фильма из минут в формат "ччмм".
const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60); // Вычисляем количество часов, округляя результат вниз.
  const minutes = duration % 60; // Вычисляем количество минут, оставшихся после вычисления часов.
  return `${hours}ч${minutes}м`; // Возвращаем строку с форматированной длительностью в формате "ччмм".
}

export {
  filterMovieDuration,
  filterMoviesByTitle,
  formatDuration,
};
