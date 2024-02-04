import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyItem from './PropertyItem';

jest.mock('../../../Buttons/CustomButton/CustomButton', () => (props: any) => (
  <button onClick={props.onClick} data-testid="custom-button">{props.symbol}</button>
));

jest.mock('../CategoriesProperty/CategoriesProperty.tsx', () => (props: any) => (
  <div data-testid="add-property" data-prefix={props.prefix} data-level={props.level}></div>
));

describe('PropertyItem', () => {
  const mockOnRemove = jest.fn();
  const mockSetPrefix = jest.fn();
  const prefix = 'testPrefix';
  const property = { id: 'propertyId' }; 
  const index = 0;
  const level = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly and triggers onRemove when button is clicked', () => {
    render(
      <PropertyItem
        prefix={prefix}
        property={property}
        index={index}
        onRemove={mockOnRemove}
        level={level}
        showAddButton={true}
        setPrefix={mockSetPrefix}
      />
    );

    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    expect(screen.getByTestId('add-property')).toBeInTheDocument();

    const addPropertyElement = screen.getByTestId('add-property');
    expect(addPropertyElement).toHaveAttribute('data-prefix', expect.stringContaining(prefix));
    expect(addPropertyElement).toHaveAttribute('data-level', `${level}`);

    fireEvent.click(screen.getByTestId('custom-button'));
    expect(mockOnRemove).toHaveBeenCalledWith(index);
  });
});
