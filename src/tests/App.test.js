import React from 'react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test for Pokédex <App /> component', () => {
  it('Verifies if links contains the text Home, About and Favorite Pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkToHome = screen.getByRole('link', { name: /home/i });
    const linkToAbout = screen.getByRole('link', { name: /about/i });
    const linkToFavorite = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorite).toBeInTheDocument();
  });

  it('Verifies if clicking Home, the link redirects webpage to "/"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkToHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkToHome);

    const mainTitlePokedex = screen.getByRole('heading', { level: 1, name: /pokédex/i });
    const subtitleHome = screen
      .getByRole('heading', { level: 2, name: /encountered pokémons/i });

    expect(mainTitlePokedex).toBeInTheDocument();
    expect(subtitleHome).toBeInTheDocument();
  });

  it('Verifies if clicking About, the link redirects webpage to "/about"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkToAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkToAbout);

    const mainTitlePokedex = screen.getByRole('heading', { level: 1, name: /pokédex/i });
    const subtitleAbout = screen
      .getByRole('heading', { level: 2, name: /about pokédex/i });

    expect(mainTitlePokedex).toBeInTheDocument();
    expect(subtitleAbout).toBeInTheDocument();
  });

  it('Verifies if clicking Favorite Pokémons, the link redirects webpage to "/favorites"',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const linkToFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(linkToFavorite);

      const mainTitlePokedex = screen
        .getByRole('heading', { level: 1, name: /pokédex/i });
      const subtitleFavorite = screen
        .getByRole('heading', { level: 2, name: /favorite pokémons/i });

      expect(mainTitlePokedex).toBeInTheDocument();
      expect(subtitleFavorite).toBeInTheDocument();
    });

  it('Verifies if using another link, the webpage is redirected to "page not found"',
    () => {
      const { history } = renderWithRouter(<App />);

      const mainTitlePokedex = screen
        .getByRole('heading', { level: 1, name: /pokédex/i });
      const subtitleHome = screen
        .getByRole('heading', { level: 2, name: /encountered pokémons/i });

      expect(mainTitlePokedex).toBeInTheDocument();
      expect(subtitleHome).toBeInTheDocument();

      history.push('xablau');
      const subtitleNotFound = screen
        .getByRole('heading', { level: 2, name: /page requested not found/i });
      expect(subtitleNotFound).toBeInTheDocument();
    });
});
