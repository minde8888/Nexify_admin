import App from './App';
import { renderBrowserWithContext } from './testUtils/RenderBrowserWithContext';

jest.mock('react-markdown', () => ({
    ...jest.requireActual('react-markdown'), 
    Markdown: ({ children }: any) => <div>{children}</div>,
  }));
  

describe('<App />', () => {
  test('renders', () => {
    const { baseElement } = renderBrowserWithContext(<App />);
    expect(baseElement).toBeVisible();
  });
});
