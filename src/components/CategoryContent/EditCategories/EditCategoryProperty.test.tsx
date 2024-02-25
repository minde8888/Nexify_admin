import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditCategoryProperty from './EditCategoryProperty';
import { CategoryResponse } from '../../../types/category';

jest.mock('../../../hooks/useFormikValues', () => ({
  __esModule: true,
  default: () => ({
    addNewValue: jest.fn(),
    values: { categoryName: '', description: '', imageSrc: '' },
  }),
}));

jest.mock('@mdxeditor/editor', () => ({
  MDXEditor: () => 'MDXEditor'
}));

jest.mock('../../MarkDownEditor/EnhancedMdxEditorComponent', () => {
  return {
      __esModule: true,
      default: ({ content }: any) => <textarea aria-label="content" defaultValue={content}></textarea>, 
  };
});

jest.mock('../../InputFields/TextInputField', () => ({
  __esModule: true,
  TextInputField: ({ label, id, className, name }: TextInputFieldProps) => (
      <div>
          {label && <label htmlFor={id}>{label}</label>}
          <input
              id={id}
              name={name}
              className={className}
              defaultValue={'Test Title'}            
          />
      </div>
  ),
}));

describe('EditCategoryProperty', () => {
  const mockCategory = {
    id: '1',
    categoryName: 'Test Category',
    description: 'Test Description',
    imageSrc: 'imageSrc',
    dateCreated: 'Test DateCreated',
  };

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  const setup = async () => {
    const utils = render(<EditCategoryProperty isCategory={true} category={mockCategory as unknown as CategoryResponse} categoryName="Test Category" disabled={false} />);
    return {
      ...utils
    };
  };

  test('EditCategoryProperty', async () => {
    const { baseElement } = await setup();
    expect(baseElement).toBeVisible();
  });

  test('renders with initial category values', async () => {
    await setup();
    expect(screen.getByRole('button', { name: /Public/i })).toBeInTheDocument();
  });

  test('updates content when the description changes', async () => {
    await setup();

    const contentEditor = screen.getByRole('textbox', { name: /content/i });
    fireEvent.change(contentEditor, { target: { value: 'Updated Description' } });

    await waitFor(() => {
      expect(contentEditor).toHaveValue('Updated Description');
    });
  });
});
