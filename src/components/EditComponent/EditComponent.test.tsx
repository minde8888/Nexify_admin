import { render, fireEvent, screen } from '@testing-library/react';
import { CategoryResponse } from '../../types/category';
import EditComponent from './EditComponent';
import DataType from '../../types/dataType';

jest.mock('../../components/Buttons/ButtonWithIcon/ButtonWithIcon', () => (props: { onClick: () => void, altText: string }) => (
  <button onClick={props.onClick} data-testid="edit-button">{props.altText}</button>
));
jest.mock('../../components/Buttons/CustomButton/CustomButton', () => (props: { onClick: () => void, symbol: string }) => (
  <button onClick={props.onClick} data-testid="remove-button">{props.symbol}</button>
));
jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: ({ alt, src }: { alt: string, src: string }) => <img alt={alt} src={src} data-testid="category-image" />
}));
jest.mock('../../components/MDXToHTMLConverter/MDXToHTMLConverter', () => ({ mdxString }: { mdxString: string }) => (
  <div data-testid="mdx-converter">{mdxString}</div>
));

describe('Category', () => {
  const mockOnRemove = jest.fn();
  const mockOnEdit = jest.fn();
  const category: CategoryResponse = {
    id: '1',
    title: 'Test Category',
    description: 'This is a test description.',
    imageSrc: '',
    subcategories: [],
    dateCreated: '2021-01-01T00:00:00Z'
  };

  test('renders category information correctly', () => {
    render(<EditComponent data={category as unknown as DataType} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
    
    expect(screen.getByText(category.title)).toBeInTheDocument();
    expect(screen.getByTestId('mdx-converter')).toHaveTextContent(category.description);
    expect(screen.getByTestId('category-image')).toHaveAttribute('src', expect.any(String));
    expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    expect(screen.getByTestId('remove-button')).toBeInTheDocument();
  });

  test('calls onEdit when the edit button is clicked', () => {
    render(<EditComponent data={category as unknown as DataType} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
    fireEvent.click(screen.getByTestId('edit-button'));
    expect(mockOnEdit).toHaveBeenCalledWith(category.id);
  });

  test('calls onRemove when the remove button is clicked', () => {
    render(<EditComponent data={category as unknown as DataType} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
    fireEvent.click(screen.getByTestId('remove-button'));
    expect(mockOnRemove).toHaveBeenCalledWith(category.id);
  });
});
