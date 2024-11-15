import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AddPostContent from './AddPostContent';

jest.mock('../../../hooks/useFormikValues', () => ({
    __esModule: true,
    default: () => ({ addNewValue: jest.fn() }),
}));

jest.mock('@mdxeditor/editor', () => ({
    MDXEditor: () => 'MDXEditor'
}));

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

const setup = async () => {
    const utils = render(<AddPostContent
        setContent={() => { }}
        content=""
        resetImages={false}
        setResetImages={() => { }}
        checkedCategories={{}}
        componentKey={1}
        lastRequestStatus={false}
    />);
    return {
        ...utils
    };
}

jest.mock('../../InputFields/TextInputField', () => ({
    __esModule: true,
    TextInputField: ({ label, id, className, name, value }: TextInputFieldProps) => (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                name={name}
                className={className}
                defaultValue={value || 'Test Title'} 
            />
        </div>
    ),
}));


describe('AddPostContent Component', () => {
    test('renders AddPostContent component correctly', async () => {
        await setup();

        expect(screen.getByLabelText('Title')).toBeInTheDocument();
    });

    test('updates content when the description changes', async () => {
        await setup();

        const contentEditor = screen.getByRole('textbox', { name: /content/i });
        fireEvent.change(contentEditor, { target: { value: 'Updated Description' } });

        await waitFor(() => {
            expect(contentEditor).toHaveValue('Updated Description');
        });
    });

    test('handles form submission', async () => {
        await setup();

        const submitButton = screen.getByText('Public');
        fireEvent.click(submitButton);
    });
});
