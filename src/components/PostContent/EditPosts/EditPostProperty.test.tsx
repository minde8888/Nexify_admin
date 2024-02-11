import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useCheckboxContext } from '../../../context/checkboxProvider';
import useFormikValues from '../../../hooks/useFormikValues';
import { Post } from '../../../types/post';
import { CategoryResponse } from '../../../types/category';
import EditPostProperty from './EditPostProperty';

jest.mock('../../../hooks/useFormikValues');
jest.mock('../../../context/checkboxProvider');
jest.mock('../../UploadImages/UploadImages', () => () => <div>UploadImages Mock</div>);
jest.mock('../../InputFields/TextInputField', () => ({
    __esModule: true,
    TextInputField: ({ label, id, className, name }: TextInputFieldProps) => (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                name={name}
                className={className}
                defaultValue={'Test Title'}            
            />
        </div>
    ),
}));

jest.mock('../../MarkDownEditor/EnhancedMdxEditorComponent', () => {
    return {
        __esModule: true,
        default: ({ content }: any) => <textarea aria-label="content" defaultValue={content}></textarea>, 
    };
});

interface CheckboxFieldProps {
    label?: string;
    className?: string;
}

jest.mock('../../InputFields/CheckboxField', () => {
    return {
        __esModule: true,
        CheckboxField: ({ 
             label, className }: CheckboxFieldProps) => (
            <label className={className}>Checkbox Mock - {label}</label>
        ),
    };
});

const mockUseFormikValues = useFormikValues as jest.MockedFunction<typeof useFormikValues>;
const mockUseCheckboxContext = useCheckboxContext as jest.MockedFunction<typeof useCheckboxContext>;

describe('EditPostProperty Component', () => {
    beforeEach(() => {
        mockUseFormikValues.mockReturnValue({
            addNewValue: jest.fn(),
            values: {
                values: [{ id: '1', title: 'Mock Title', content: 'Mock Content' }] as Post[]
            },
        });

        mockUseCheckboxContext.mockReturnValue({
            checkedCategories: {},
            setCheckedCategories: jest.fn(),
            resetCheckedCategories: jest.fn()
        });
    });

    test('renders with initial values', async () => {

        const categories: CategoryResponse[] = [{
            id: '1',
            categoryName: 'testCategory',
            description: 'testDescription',
            imageSrc: 'testImageSrc',
            dateCreated: 'testDateCreated',
            subcategories: []
        }];

        render(<EditPostProperty
            disabled={true}
            resetImages={false}
            setResetImages={() => { }}
            categories={categories}
            resetCheckedCategories={() => { }}
            id={''}
            title={'Test Title'} 
            content={"content"}/>);

        expect(await screen.findByDisplayValue('Test Title')).toBeInTheDocument();
        expect(await screen.findByText('UploadImages Mock')).toBeInTheDocument();
        expect(await screen.findByText(`Checkbox Mock - ${categories[0].categoryName}`)).toBeInTheDocument();
        expect(await screen.findByLabelText("content")).toHaveValue("content");
    });
});
