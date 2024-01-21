import App from './App';
import { renderBrowserWithContext } from './testUtils/RenderBrowserWithContext';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mock-uuid'),
}));

jest.mock('@mdxeditor/editor', () => ({
  MDXEditor: () => 'MockedMDXEditor',
}));

describe('<App />', () => {
  test('renders', () => {
    const { baseElement } = renderBrowserWithContext(<App />);
    expect(baseElement).toBeVisible();
  });
});
