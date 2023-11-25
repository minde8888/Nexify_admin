import App from './App';
import { renderBrowserWithContext } from './testUtils/RenderBrowserWithContext';

describe('<App />', () => {
    test('renders', () => {
        const { baseElement } = renderBrowserWithContext(<App />);
        expect(baseElement).toBeVisible();
    });
});