import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test for Pokédex <NotFound /> component', () => {
  it('Verifies if NotFound webpage contains heading with text "Page requested not found"',
    () => {
      render(<NotFound />);

      const pageNotFound = screen
        .getByRole('heading', { level: 2, name: /page requested not found/i });
      const cryingEmoji = screen.getByRole('img', { name: /crying emoji/i });

      expect(pageNotFound).toBeInTheDocument();
      expect(cryingEmoji).toBeInTheDocument();
    });

  it('Verifies if NotFound webpage contains image of crying Pikachu',
    () => {
      render(<NotFound />);

      const imagePikachu = screen
        .getByRole('img',
          { name: /Pikachu crying because the page requested was not found/i });

      expect(imagePikachu).toBeInTheDocument();
      expect(imagePikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
