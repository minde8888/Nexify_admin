import { render, screen } from '@testing-library/react';
import MDXToHTMLConverter from './MDXToHTMLConverter';

test('renders HTML from MDX string', () => {
  const mdxString = '# Heading 1\nThis is a paragraph.';
  
  render(<MDXToHTMLConverter mdxString={mdxString} />);
  
  const headingElement = screen.getByRole('heading', { level: 1 });
  const paragraphElement = screen.getByText('This is a paragraph', { exact: false });
  
  expect(headingElement).toBeInTheDocument();
  expect(paragraphElement).toBeInTheDocument();
});
