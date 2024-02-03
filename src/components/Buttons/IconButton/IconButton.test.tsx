import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconButton } from './IconButton'; 

describe('IconButton', () => {
  const mockOnClick = jest.fn();
  const iconUrl = 'test-icon.png';

  test('renders the icon with the provided src', () => {
    render(<IconButton onClick={mockOnClick} icon={iconUrl} />);
    const imageElement = screen.getByRole('img', { name: "imgAltText" });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', iconUrl);
  });

  test('calls onClick handler when clicked', () => {
    render(<IconButton onClick={mockOnClick} icon={iconUrl} />);
    const buttonElement = screen.getByTestId('icon-button');
    fireEvent.click(buttonElement!); 
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
