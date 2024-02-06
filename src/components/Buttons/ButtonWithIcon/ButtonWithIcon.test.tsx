import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonWithIcon from './ButtonWithIcon'; 
import { ButtonError } from '../../../errorHandler/buttonError'; 

describe('ButtonWithIcon', () => {
    const mockOnClick = jest.fn();
    const icon = 'test-icon-url.png';
    const altText = 'Test Icon';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with required props', () => {
        render(<ButtonWithIcon icon={icon} altText={altText} onClick={mockOnClick} id={''} />);

        const button = screen.getByRole('button');
        const image = screen.getByAltText(altText);

        expect(button).toBeInTheDocument();
        expect(image).toHaveAttribute('src', icon);
    });

    test('calls onClick handler when clicked', () => {
        render(<ButtonWithIcon icon={icon} altText={altText} onClick={mockOnClick} id={''} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('applies custom styles if provided', () => {
        const customStyle = { backgroundColor: 'red' };
        render(<ButtonWithIcon icon="path/to/icon.png" altText="Test Icon" style={customStyle} id={''} />);

        const buttonWrapper = screen.getByTestId('button-with-icon');

        expect(buttonWrapper).toHaveStyle(`background-color: red`);
    });


    test('throws ButtonError if icon or altText props are missing', () => {
        const consoleSpy = jest.spyOn(console, 'error');
        consoleSpy.mockImplementation(() => { });

        expect(() => render(<ButtonWithIcon altText={altText} icon={''} id={''} />)).toThrow(ButtonError);
        expect(() => render(<ButtonWithIcon icon={icon} altText={''} id={''} />)).toThrow(ButtonError);

        consoleSpy.mockRestore();
    });
});
