import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test for Pokédex <FavoritePokemons /> component', () => {
  it('Verifies if Favorite webpage renders a message when no favorite pokemon selected',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkToFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(linkToFavorite);
      expect(history.location.pathname).toBe('/favorites');

      const PokemonNotFound = screen.getByText(/No favorite pokemon found/);
      expect(PokemonNotFound).toBeInTheDocument();
    });

  it('Verifies if favorite pokemon is selected and rendered on Favorite webpage',
    () => {
      const { history } = renderWithRouter(<App />);

      const pokemonPikachu = screen.getByText(/pikachu/i);
      expect(pokemonPikachu).toBeInTheDocument();

      const linkToDetails = screen.getByRole('link', { name: /more details/i });
      expect(linkToDetails).toBeInTheDocument();
      userEvent.click(linkToDetails);
      expect(history.location.pathname).toBe('/pokemons/25');

      const favoriteSelected = screen.getByRole('checkbox');
      expect(favoriteSelected).toBeInTheDocument();
      userEvent.click(favoriteSelected);

      const linkToFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(linkToFavorite);
      expect(history.location.pathname).toBe('/favorites');

      const pikachuAsFavorite = screen.getByText(/pikachu/i);
      expect(pikachuAsFavorite).toBeInTheDocument();
    });
});
