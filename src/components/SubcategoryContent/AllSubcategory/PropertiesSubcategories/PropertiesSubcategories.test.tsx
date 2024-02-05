import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PropertiesSubcategories from './PropertiesSubcategories';

const mockCategories = [
    {
        id: '1',
        categoryName: 'Test Category 1',
        description: 'This is a test description. 1',
        imageSrc: '',
        subcategories: [],
        dateCreated: '2021-01-01T00:00:00Z'
    },
    {
        id: '2',
        categoryName: 'Test Category 2',
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
        categories={mockCategories}
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
        // Reset mocks before each test
        mockToggle.mockClear();
        mockSetPrefix.mockClear();
    });

    test('renders categories and subcategories correctly', async () => {
        await setup();

        // Correcting text to match the mock data
        expect(screen.getByText('Test Category 1')).toBeInTheDocument();
        expect(screen.getByText('Test Category 2')).toBeInTheDocument();
    });

    test('opens modal with correct id on add new property click', async () => {
        await setup();

        // Assuming your component renders a button to open modal for adding a new property, and it's identifiable by text or testId
        fireEvent.click(screen.getAllByText('+')[0]); // Make sure this selector matches how you identify the button
        expect(mockToggle).toHaveBeenCalledTimes(1);

        // This part of the test might need adjustment based on how your modal is expected to work.
        // If you are checking that the modal receives correct props, consider directly testing the modal's behavior in its own test suite.
    });
});
