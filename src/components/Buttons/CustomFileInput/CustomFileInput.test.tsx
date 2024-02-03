import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomFileInput from './CustomFileInput'; // Adjust the import path as necessary

describe('CustomFileInput', () => {
  const mockOnChange = jest.fn();
  const icon = 'test-icon.png';
  const altText = 'Upload';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<CustomFileInput icon={icon} altText={altText} onChange={mockOnChange} />);
    const imageElement = screen.getByAltText(altText) as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toContain(icon);
  });
  

  test('calls onChange handler when a file is selected', () => {
    render(<CustomFileInput icon={icon} altText={altText} onChange={mockOnChange} />);
    const input = screen.getByLabelText(altText); // Now this should work
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  
    fireEvent.change(input, { target: { files: [file] } });
    expect(mockOnChange).toHaveBeenCalled();
  });
  

  test('validates file type correctly and displays error for invalid types', () => {
    const accept = 'image/png';
    render(<CustomFileInput icon={icon} altText={altText} onChange={mockOnChange} accept={accept} />);
    const input = screen.getByLabelText(altText);
    const file = new File(['hello'], 'hello.pdf', { type: 'application/pdf' });

    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('Invalid file type. Please select a valid image file.')).toBeInTheDocument();
  });

  test('does not display error for valid file types', () => {
    const accept = 'image/png';
    render(<CustomFileInput icon={icon} altText={altText} onChange={mockOnChange} accept={accept} />);
    const input = screen.getByLabelText(altText);
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });
    expect(mockOnChange).toHaveBeenCalled();
    expect(screen.queryByText('Invalid file type. Please select a valid image file.')).not.toBeInTheDocument();
  });
});
