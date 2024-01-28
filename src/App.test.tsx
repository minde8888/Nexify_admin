import App from './App';
import { renderBrowserWithContext } from './testUtils/RenderBrowserWithContext';

jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('mock-uuid'),
}));

jest.mock('@mdxeditor/editor', () => ({
    MDXEditor: () => 'MockedMDXEditor',
}));

jest.mock('axios', () => {
    const mockAxiosInstance = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        interceptors: {
            request: {
                use: jest.fn(),
            },
            response: {
                use: jest.fn(),
            },
        },
    };

    return {
        create: jest.fn(() => mockAxiosInstance),
        ...mockAxiosInstance,
    };
});


describe('<App />', () => {
    test('renders', () => {
        const { baseElement } = renderBrowserWithContext(<App />);
        expect(baseElement).toBeVisible();
    });
});