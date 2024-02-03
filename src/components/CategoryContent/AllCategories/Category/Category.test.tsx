import { render } from '@testing-library/react';
import Category from './Category';


jest.mock('../../../Buttons/ButtonWithIcon/ButtonWithIcon.tsx', () => (props: any) => (
  <button onClick={props.onClick} data-testid="edit-button">{props.altText}</button>
));
jest.mock('../../../Buttons/CustomButton/CustomButton.tsx', () => (props: any) => (
  <button onClick={props.onClick} data-testid="remove-button">{props.symbol}</button>
));
jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: ({ alt }: any) => <img alt={alt} data-testid="category-image" />
}));
jest.mock('../../../MDXToHTMLConverter/MDXToHTMLConverter.tsx', () => (props: any) => (
  <div data-testid="mdx-converter">{props.mdxString}</div>
));

describe('Category', () => {
  const mockOnRemove = jest.fn();
  const mockOnEdit = jest.fn();
  const category = {
    id: '1',
    categoryName: 'Test Category',
    description: 'This is a test description.',
    imageSrc: '',
    subcategories: [],
    dateCreated: '2021-01-01T00:00:00Z' // Add the missing dateCreated property
  };

  // Remove beforeEach and render directly in each test
  test('renders category information correctly', () => {
    render(<Category category={category} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
    // Test assertions...
  });

  test('calls onEdit when the edit button is clicked', () => {
    render(<Category category={category} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
    // Test assertions...
  });

  test('calls onRemove when the remove button is clicked', () => {
    render(<Category category={category} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
    // Test assertions...
  });
});

