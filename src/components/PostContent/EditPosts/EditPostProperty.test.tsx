// Assuming you have the following interfaces defined and imported correctly
import React from 'react';
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
    TextInputField: ({ label, id, placeholder, autoFocus, 'data-testid': testId, ...props }: TextInputFieldProps) => (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                placeholder={placeholder}
                autoFocus={autoFocus}
                data-testid={testId}
                {...props}
            />
        </div>
    ),
}));
jest.mock('../../MarkDownEditor/EnhancedMdxEditorComponent', () => ({
    __esModule: true,
    default: () => <textarea aria-label="content">Mocked Component</textarea>,
}));
jest.mock('../../InputFields/CheckboxField', () => ({ label }: { label: string }) => <label>Checkbox Mock - {label}</label>);


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
    test('renders a simplified version without errors', () => {
        const categories: CategoryResponse[] = [{
            id: '1',
            categoryName: 'testCategory',
            description: 'testDescription',
            imageSrc: 'testImageSrc',
            dateCreated: 'testDateCreated',
            subcategories: []
        }];
        render(<EditPostProperty disabled={true} resetImages={false} setResetImages={() => { }}  resetCheckedCategories={() => { }} id={''} title={''} />);
        // Assertions to check if the component renders
    });


    test('renders with initial values', () => {
        const post: Post = {
            id: '1',
            title: 'Test Title',
            content: 'Test Content',
            imageSrc: ['http://example.com/test.jpg'],
        };

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
            title={''} />);

        expect(screen.getByDisplayValue(post.title)).toBeInTheDocument();
        expect(screen.getByText('UploadImages Mock')).toBeInTheDocument();
        expect(screen.getByText('Checkbox Mock - TestCategory')).toBeInTheDocument();
        expect(screen.getByText(post.content ?? "default fallback content")).toBeInTheDocument();
    });

});
