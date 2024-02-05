import { render, screen } from '@testing-library/react';
import Subcategory from './Subcategory';
import { SubcategoryResponse } from '../../../../types/category';

describe('Subcategory Component', () => {
    const subcategories: SubcategoryResponse[] = [
        { id: '1', categoryName: 'Category 1', description: 'description 1', imageSrc: 'imageSrc 1', dateCreated: 'dateCreated 1' },
        { id: '2', categoryName: 'Category 2', description: 'description 2', imageSrc: 'imageSrc 2', dateCreated: 'dateCreated 2' },
    ];

    test('renders subcategories correctly', () => {
        render(<Subcategory subcategories={subcategories} />);

        subcategories.forEach((subcategory) => {
            const categoryNameElement = screen.getByText(subcategory.categoryName);
            expect(categoryNameElement).toBeInTheDocument();
        });
    });

    test('handles empty subcategories array', () => {
        const { container } = render(<Subcategory subcategories={[]} />);

        expect(container).toBeDefined();
    });
});
