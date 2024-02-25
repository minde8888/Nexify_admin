import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PropertiesSubcategories from './PropertiesSubcategories';
import { CategoryResponse } from '../../../../types/category';

const mockCategories = [
    {
        id: '1',
        title: 'Test Category 1',
        description: 'This is a test description. 1',
        imageSrc: '',
        subcategories: [],
        dateCreated: '2021-01-01T00:00:00Z'
    },
    {
        id: '2',
        title: 'Test Category 2',
        description: 'This is a test description. 2',
        imageSrc: '',
        subcategories: [],
        dateCreated: '2021-01-01T00:00:00Z'
    },
];

jest.mock('../../../../hooks/useFormikValues', () => ({
    __esModule: true,
    default: () => ({ addNewValue: jest.fn() }),
  }));
  

const mockToggle = jest.fn();
const mockSetPrefix = jest.fn();
const mockFormikRef = { current: null };

const setup = async () => {
    const utils = render(<PropertiesSubcategories
        categories={mockCategories as unknown as CategoryResponse[]}
        toggle={mockToggle}
        setPrefix={mockSetPrefix}
        isOpen={false}
        disabled={false}
        formikRef={mockFormikRef} />);
    return {
        ...utils
    };
}

describe('PropertiesSubcategories', () => {
    beforeEach(() => {
        mockToggle.mockClear();
        mockSetPrefix.mockClear();
    });

    test('renders categories and subcategories correctly', async () => {
        await setup();

        expect(screen.getByText('Test Category 1')).toBeInTheDocument();
        expect(screen.getByText('Test Category 2')).toBeInTheDocument();
    });

    test('opens modal with correct id on add new property click', async () => {
        await setup();

        fireEvent.click(screen.getAllByText('+')[0]); 
        expect(mockToggle).toHaveBeenCalledTimes(1);
    });
});
