import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkboxes from './Checkboxes';
import { CheckboxProvider } from '../../../../context/checkboxProvider';

describe('Checkboxes Component', () => {
    const mockCategories = [
        {
            id: 'cat1',
            title: 'Category 1',
            description: 'Description 1',
            imageSrc: 'image1.jpg',
            dateCreated: '2021-01-01',
            subcategories: [
                {
                    id: 'sub1',
                    title: 'Subcategory 1',
                    description: 'Description sub 1',
                    imageSrc: 'subimage1.jpg',
                    dateCreated: '2021-02-01',
                },
            ],
        },
    ];

    test('checkbox changes state upon user interaction', () => {
        render(
            <CheckboxProvider> 
                <Checkboxes categories={mockCategories} />
            </CheckboxProvider>
        );
        const checkbox = screen.getByLabelText('Category 1');
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });
});
