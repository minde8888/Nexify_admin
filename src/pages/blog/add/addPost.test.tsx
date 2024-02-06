import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as fetchDataHook from '../../../hooks/useDataFetching';
import * as useFormHook from '../../../hooks/useForm';
import AddPost from './addPost';

jest.mock('../../../hooks/useDataFetching');
jest.mock('../../../hooks/useForm');
jest.mock('../../../hooks/useRedux');
jest.mock('../../../context/checkboxProvider');
jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('mock-uuid'),
}));
jest.mock('@mdxeditor/editor', () => ({
    MDXEditor: () => 'MockedMDXEditor',
}));
// Mocking a module with a default export
jest.mock('../../../hooks/useForm', () => ({
    __esModule: true, // This is necessary for mocking default exports
    default: jest.fn().mockReturnValue({
        handleSubmit: jest.fn(),
    }),
}));
jest.mock('../../../hooks/useDataFetching', () => ({
    useFetchData: jest.fn().mockReturnValue({
        loading: false,
        fetchData: jest.fn(),
    }),
}));

beforeEach(() => {
    // Reset mocks if necessary
    useFormHook.default.mockImplementation(() => ({
        handleSubmit: jest.fn(),
    }));

    fetchDataHook.useFetchData.mockImplementation(() => ({
        loading: false,
        fetchData: jest.fn(),
    }));

    // No need to use jest.spyOn now as the modules are already mocked
});


describe('<AddPost />', () => {
    test('renders correctly and allows form submission', async () => {
        await render(<AddPost />);

        // Check if the component renders correctly
        expect(screen.getByText('Add Post')).toBeInTheDocument();

        // Simulate form submission
        const submitButton = screen.getByText('Submit'); // Adjust based on your actual button text
        fireEvent.click(submitButton);

        // Wait for the handleSubmit to be called
        await waitFor(() => {
            expect(useFormHook.handleSubmit).toHaveBeenCalled();
        });
    });

    // Add more tests as needed
});