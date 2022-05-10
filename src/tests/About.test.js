import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Test for Pokédex <About /> component', () => {
  it('Verifies if About webpage contains heading with text "About Pokédex"', () => {
    render(<About />);
    const subtitleAbout = screen
      .getByRole('heading', { level: 2, name: /about pokédex/i });

    expect(subtitleAbout).toBeInTheDocument();
  });

  it('Verifies if About webpage contains two paragraphs with information about Pokédex ',
    () => {
      render(<About />);
      const firstParagraph = screen.getByText(/containing all/);
      const secondParagraph = screen.getByText(/for each one/);

      expect(firstParagraph).toBeInTheDocument();
      expect(secondParagraph).toBeInTheDocument();
    });

  it('Verifies if About webpage contains an image of a Pokédex ', () => {
    render(<About />);
    const imagePokedex = screen.getByRole('img', { name: /Pokédex/i });

    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
