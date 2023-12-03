import App from './App';
import { renderBrowserWithContext } from './testUtils/RenderBrowserWithContext';

jest.mock('@uiw/react-md-editor', () => ({
  ...jest.requireActual('@uiw/react-md-editor'),
  default: ({ children }: any) => <div>{children}</div>,
}));

describe('<App />', () => {
  test('renders', () => {
    const { baseElement } = renderBrowserWithContext(<App />);
    expect(baseElement).toBeVisible();
  });
});
