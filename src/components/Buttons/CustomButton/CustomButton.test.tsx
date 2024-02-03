import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomButton from './CustomButton'; // Adjust the import path as needed
import { ButtonError } from '../../../errorHandler/buttonError';

describe('CustomButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly and responds to clicks', () => {
    render(<CustomButton onClick={mockOnClick} style="test-style" symbol="+" />);
    const button = screen.getByRole('button', { name: '+' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('applies provided style as class name', () => {
    render(<CustomButton onClick={mockOnClick} style="test-style" symbol="+" />);
    const buttonWrapper = screen.getByTestId('custom-button');
    expect(buttonWrapper).toHaveClass('test-style');
  });

  test('throws an error for invalid style prop', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    expect(() => render(<CustomButton onClick={mockOnClick} style={undefined} symbol="+" />)).toThrow(ButtonError);

    console.error = originalConsoleError;
  });
});
