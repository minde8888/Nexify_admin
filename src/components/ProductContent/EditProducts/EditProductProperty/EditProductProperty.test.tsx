import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditProductProperty from './EditProductProperty';
import { useCheckboxContext } from '../../../../context/checkboxProvider';
import useFormikValues from '../../../../hooks/useFormikValues';
import { CategoryResponse } from '../../../../types/category';

jest.mock('../../../../hooks/useFormikValues');
jest.mock('../../../../context/checkboxProvider');
jest.mock('../../../ProductContent/EditProducts/Checkboxes/Checkboxes');
jest.mock('../../../UploadImages/UploadImages', () => () => <div>UploadImages Mock</div>);
jest.mock('../../../InputFields/TextInputField', () => ({
    __esModule: true,
    TextInputField: ({ label, id, className, name }: TextInputFieldProps) => (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                name={name}
                className={className}
                defaultValue={'default'}
            />
        </div>
    ),
}));

jest.mock('../../../MarkDownEditor/EnhancedMdxEditorComponent', () => ({
    __esModule: true,
    default: ({ content }: any) => <textarea aria-label="Content" defaultValue={content}></textarea>,
}));

const mockUseFormikValues = useFormikValues as jest.MockedFunction<typeof useFormikValues>;
const mockUseCheckboxContext = useCheckboxContext as jest.MockedFunction<typeof useCheckboxContext>;

const categories: CategoryResponse[] = [{
    id: '1',
    title: 'testCategory',
    description: 'testDescription',
    imageSrc: 'testImageSrc',
    dateCreated: 'testDateCreated',
    subcategories: []
}];

const mockProps = {
    id: '1',
    title: 'Product Title',
    content: 'Product Content',
    imageSrc: ['image1.jpg'],
    price: '100',
    discount: '10',
    location: 'Location1',
    stock: '50',
    disabled: false,
    resetImages: false,
    setResetImages: jest.fn(),
    checkedCategoryIds: [{ id: 'cat1' }],
    checkedSubcategoryIds: [{ id: 'subCat1' }],
    checkedAttributesIds: [{ id: 'attr1' }],
    categories: categories,
    attributes: [
        { id: 'attr1', attributeName: 'Attribute 1', "": "" },
    ],
    resetChecked: jest.fn()
};

describe('EditProductProperty Component', () => {

    beforeEach(() => {
        mockUseFormikValues.mockReturnValue({
            addNewValue: jest.fn(),
            values: {
                values: [{ id: '1', title: 'Mock Title', content: 'Mock Content' }]
            },
        });

        mockUseCheckboxContext.mockReturnValue({
            checked: {},
            setChecked: jest.fn(),
            resetChecked: jest.fn()
        });
    });

    describe('EditProductProperty Component', () => {
        test('should render correctly with given props', async () => {
            render(<EditProductProperty {...mockProps} />);

            expect(await screen.findByText('Title')).toBeInTheDocument();
            expect(await screen.findByText('UploadImages Mock')).toBeInTheDocument();
            expect(await screen.findByText('Product Content')).toBeInTheDocument();
            expect(await screen.findByText('discount')).toBeInTheDocument();
            expect(await screen.findByText('stock')).toBeInTheDocument();
        });
    });
});

