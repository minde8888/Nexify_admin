import { render, screen } from '@testing-library/react';
import Subcategories from './Subcategories';
import '@testing-library/jest-dom';
import { SubcategoryResponse } from '../../../../types/category';

describe('Subcategories', () => {
    const mockSubcategories = [
        { id: '1', title: 'Subcategory 1', description: 'Description 1', imageSrc: 'imageSrc 1', dateCreated: 'dateCreated 1' },
        { id: '2', title: 'Subcategory 2', description: 'Description 2', imageSrc: 'imageSrc 2', dateCreated: 'dateCreated 2' }
    ];

    const setup = async () => {
        const mockOnRemove = jest.fn();
        const mockOnEdit = jest.fn();
        const utils = render(<Subcategories onRemove={mockOnRemove} onEdit={mockOnEdit}  subcategories={mockSubcategories as SubcategoryResponse[]} />);
        return {
            ...utils
        };
    };

    test('renders all subcategories passed as props', async () => {
        await setup()

        mockSubcategories.forEach(subcategory => {
            expect(screen.getByText(subcategory.title)).toBeInTheDocument();
        });
    });
});

