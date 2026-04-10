const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

const HIMYM_ID = 1100;

export function getPosterUrl(path, size = "w300") {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(path, size = "w1280") {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}

export async function getSeriesInfo() {
  const [resEs, resEn] = await Promise.all([
    fetch(`${BASE_URL}/tv/${HIMYM_ID}?api_key=${API_KEY}&language=es-MX`),
    fetch(`${BASE_URL}/tv/${HIMYM_ID}?api_key=${API_KEY}&language=en-US`),
  ]);
  const dataEs = await resEs.json();
  const dataEn = await resEn.json();

  return {
    ...dataEs,
    poster_path: dataEn.poster_path,
    backdrop_path: dataEn.backdrop_path,
    seasons: dataEs.seasons.map((season, i) => ({
      ...season,
      poster_path: dataEn.seasons[i]?.poster_path ?? season.poster_path,
    })),
  };
}

export async function getSeasonDetail(seasonNumber) {
  const [resEs, resEn] = await Promise.all([
    fetch(
      `${BASE_URL}/tv/${HIMYM_ID}/season/${seasonNumber}?api_key=${API_KEY}&language=es-MX`,
    ),
    fetch(
      `${BASE_URL}/tv/${HIMYM_ID}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`,
    ),
  ]);
  const dataEs = await resEs.json();
  const dataEn = await resEn.json();

  return {
    ...dataEs,
    poster_path: dataEn.poster_path,
    episodes: dataEs.episodes.map((ep, i) => ({
      ...ep,
      still_path: dataEn.episodes[i]?.still_path ?? ep.still_path,
    })),
  };
}
