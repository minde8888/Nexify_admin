import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AttributeContext from './AttributeContext';
import { Attributes } from '../../../../types/attributes';

describe('AttributeContext Component', () => {
    const mockOnRemove = jest.fn();
    const mockOnEdit = jest.fn();

    const mockAttribute: Attributes = {
        id: '1',
        attributeName: 'Test Attribute',
        imageName: 'test-image-url.svg',
        '': ''
    };

    test('renders the component with correct data', () => {
        render(<AttributeContext attribute={mockAttribute} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
        expect(screen.getByRole('heading', { name: mockAttribute.attributeName })).toBeInTheDocument();
        expect(screen.getByAltText(mockAttribute.attributeName)).toHaveAttribute('src', mockAttribute.imageName);
    });

    test('calls onEdit when edit button is clicked', () => {
        render(<AttributeContext attribute={mockAttribute} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
        fireEvent.click(screen.getByAltText('Edit'));
        expect(mockOnEdit).toHaveBeenCalledWith(mockAttribute.id);
    });

    test('calls onRemove when remove button is clicked', () => {
        render(<AttributeContext attribute={mockAttribute} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
        fireEvent.click(screen.getAllByText('-')[0]); 
        expect(mockOnRemove).toHaveBeenCalledWith(mockAttribute.id);
    });
});
