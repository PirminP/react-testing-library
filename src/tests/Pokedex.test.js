import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';

describe('Test for Pokédex <Pokedex /> component', () => {
  const testIdType = 'pokemon-type';
  it('Verifies if Pokedex webpage contains heading with text "Encountered pokémons"',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const subtitleHome = screen
        .getByRole('heading', { level: 2, name: /encountered pokémons/i });

      expect(subtitleHome).toBeInTheDocument();
    });

  it('Verifies if next pokemon is shown when button "Próximo pokémon" is clicked',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId(testIdType);

      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

      pokemons.forEach(({ name, type }) => {
        expect(pokemonName).toHaveTextContent(name);
        expect(pokemonType).toHaveTextContent(type);
        userEvent.click(buttonNext);
      });
    });

  // another loop test???

  it('Verifies if only one pokemon is rendered at once',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const pokemonNames = screen.getAllByTestId('pokemon-name');
      const pokemonTypes = screen.getAllByTestId(testIdType);

      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

      pokemons.forEach(({ name, type }) => {
        expect(pokemonNames[0]).toHaveTextContent(name);
        expect(pokemonTypes[0]).toHaveTextContent(type);
        expect(pokemonNames).toHaveLength(1);
        expect(pokemonTypes).toHaveLength(1);
        userEvent.click(buttonNext);
      });
    });

  it('Verifies if filter button for every pokemon type exists',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const buttonTypes = screen.getAllByTestId('pokemon-type-button');

      const allPokemonTypes = pokemons.map((pokemon) => pokemon.type);
      const pokemonTypes = [...new Set(allPokemonTypes)];

      buttonTypes.forEach((button, i) => {
        expect(button).toHaveTextContent(pokemonTypes[i]);
      });
    });

  it('Verifies if the pokemon is filterd by type when button clicked',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const pokemonType = screen.getByTestId(testIdType);
      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

      const buttonPsychic = screen.getByRole('button', { name: /psychic/i });
      userEvent.click(buttonPsychic);

      for (let i = 0; i < pokemons.length; i += 1) {
        expect(pokemonType).toHaveTextContent(/psychic/i);
        userEvent.click(buttonNext);
      }

      const buttonFire = screen.getByRole('button', { name: /fire/i });
      userEvent.click(buttonFire);

      for (let i = 0; i < pokemons.length; i += 1) {
        expect(pokemonType).toHaveTextContent(/fire/i);
        userEvent.click(buttonNext);
      }
    });

  it('Verifies if "All" button is always visible',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const buttonAll = screen.getByRole('button', { name: /all/i });
      expect(buttonAll).toBeInTheDocument();

      const buttonFire = screen.getByRole('button', { name: /fire/i });
      userEvent.click(buttonFire);
      expect(buttonAll).toBeInTheDocument();

      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(buttonNext);
      expect(buttonAll).toBeInTheDocument();

      userEvent.click(buttonAll);
      expect(buttonAll).toBeInTheDocument();
    });

  it('Verifies if "All" button resets filter',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const buttonFire = screen.getByRole('button', { name: /fire/i });
      userEvent.click(buttonFire);
      const pokemonType = screen.getByTestId(testIdType);
      expect(pokemonType).toHaveTextContent(/fire/i);

      const buttonAll = screen.getByRole('button', { name: /all/i });
      userEvent.click(buttonAll);

      expect(pokemonType).not.toHaveTextContent(/fire/i);
      expect(pokemonType).toHaveTextContent(/electric/i);
    });
});
