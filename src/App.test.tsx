import App from './App';
import { renderBrowserWithContext } from './testUtils/RenderBrowserWithContext';

jest.mock('react-markdown', () => ({
    Markdown: ({ children }: any) => <div>{children}</div>,
    defaultUrlTransform: jest.fn(),
}));

describe('<App />', () => {
    test('renders', () => {
        const { baseElement } = renderBrowserWithContext(<App />);
        expect(baseElement).toBeVisible();
    });
});

