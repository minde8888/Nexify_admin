
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Subcategory from './Subcategory';
import { SubcategoryResponse } from '../../../../types/category';

describe('Subcategory', () => {
    const mockSubcategory = {
        id: '1',
        title: 'Test Subcategory',
        description: 'This is a test description.',
        imageSrc: 'defaultImage',
        dateCreated: 'This is a test dateCreated'
    };

    const setup = async () => {
        const mockOnRemove = jest.fn();
        const mockOnEdit = jest.fn();
        const utils = render(<Subcategory subcategory={mockSubcategory as unknown as SubcategoryResponse} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
        return {
            ...utils,
            mockOnRemove,
            mockOnEdit
        };
    };

    test('renders subcategory information correctly', async () => {
        await setup();

        expect(screen.getByText(mockSubcategory.title)).toBeInTheDocument();
        expect(screen.getByText(/This is a test description/i)).toBeInTheDocument();
        expect(screen.getByAltText(mockSubcategory.title)).toHaveAttribute('src', expect.stringContaining('defaultImage'));
    });

    test('triggers onEdit when edit button is clicked', async () => {
        const { mockOnEdit } = await setup();

        const editButton = screen.getByAltText('Edit');
        fireEvent.click(editButton);

        expect(mockOnEdit).toHaveBeenCalledWith(mockSubcategory.id);
    });

    test('triggers onRemove when remove button is clicked', async () => {
        const { mockOnRemove } = await setup();

        const removeButton = screen.getByText('-'); 
        fireEvent.click(removeButton);

        expect(mockOnRemove).toHaveBeenCalledWith(mockSubcategory.id);
    });
});
