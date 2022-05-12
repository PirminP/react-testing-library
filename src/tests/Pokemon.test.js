import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Test for Pokédex <Pokemon /> component', () => {
  it('Verifies if correct name and type of pokemon rendered',
    () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ pokemons[3] } />
        </MemoryRouter>,
      );

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonName).toHaveTextContent(/ekans/i);
      expect(pokemonType).toHaveTextContent(/poison/i);
    });

  it('Verifies if correct average weight of pokemon rendered',
    () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ pokemons[3] } />
        </MemoryRouter>,
      );

      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonWeight).toHaveTextContent(/average weight: 6.9 kg/i);
    });

  it('Verifies if image of pokemon rendered, together with src and alt',
    () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ pokemons[3] } />
        </MemoryRouter>,
      );

      const pokemonImage = screen
        .getByRole('img', { name: `${pokemons[3].name} sprite` });
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage.src).toBe(pokemons[3].image);
      expect(pokemonImage.alt).toBe(`${pokemons[3].name} sprite`);
    });

  it('Verifies if pokemon card contains more details link by using pokemons Id',
    () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ pokemons[3] } />
        </MemoryRouter>,
      );

      const moreDetailLink = screen
        .getByRole('link', { name: /more details/i });
      expect(moreDetailLink).toBeInTheDocument();
      expect(moreDetailLink.href).toBe(`http://localhost/pokemons/${pokemons[3].id}`);
    });

  it('Verifies if clicking more details link, webpage redirected',
    () => {
      const { history } = renderWithRouter(<App />);

      const moreDetailLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailLink);
      expect(history.location.pathname).toBe('/pokemons/25');
    });

  it('Verifies if url correspondes to pokemon Id when redirected',
    () => {
      const { history } = renderWithRouter(
        <Pokemon pokemon={ pokemons[2] } />,
      );

      const moreDetailLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailLink);
      expect(history.location.pathname).toBe(`/pokemons/${pokemons[2].id}`);
    });

  it('Verifies if favorite pokemon card contains star',
    () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ pokemons[8] } isFavorite />
        </MemoryRouter>,
      );

      const favoritePokemon = screen
        .getByRole('img', { name: `${pokemons[8].name} is marked as favorite` });
      expect(favoritePokemon).toBeInTheDocument();
      expect(favoritePokemon.getAttribute('src')).toBe('/star-icon.svg');
    });
});
