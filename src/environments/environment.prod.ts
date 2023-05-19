const API_DOMAIN = 'https://swapi.dev/api';
const ASSETS_DOMAIN = 'https://starwars-visualguide.com/assets/img';

export const environment = {
  production: true,
  films: `${API_DOMAIN}/films`,
  people: `${API_DOMAIN}/people`,
  planets: `${API_DOMAIN}/planets/`,
  species: `${API_DOMAIN}/species/`,
  starships: `${API_DOMAIN}/starships/`,
  vehicles: `${API_DOMAIN}/vehicles/`,
  assetCharacter: `${ASSETS_DOMAIN}/characters/`,
  assetFilms: `${ASSETS_DOMAIN}/films/`,
};
