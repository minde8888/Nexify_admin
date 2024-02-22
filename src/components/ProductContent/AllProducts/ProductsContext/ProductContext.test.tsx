import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductContext from './ProductContext';

const mockProduct = {
  id: '1',
  title: 'Test Product',
  content: 'Product description',
  imageSrc: ['test-image.jpg'],
  categories: [{ categoryName: 'Category 1' }, { categoryName: 'Category 2' }],
};

describe('ProductContext', () => {
  const mockOnEdit = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product correctly', () => {
    render(<ProductContext product={mockProduct} onEdit={mockOnEdit} onRemove={mockOnRemove} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Product description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });

  test('calls onEdit function when edit button is clicked', () => {
    render(<ProductContext product={mockProduct} onEdit={mockOnEdit} onRemove={mockOnRemove} />);

    fireEvent.click(screen.getByAltText('Edit'));

    expect(mockOnEdit).toHaveBeenCalledWith('1');
  });

  test('calls onRemove function when remove button is clicked', () => {
    render(<ProductContext product={mockProduct} onEdit={mockOnEdit} onRemove={mockOnRemove} />);

    fireEvent.click(screen.getByText('-'));

    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });
});
