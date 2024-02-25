import React from 'react';
import { render, screen } from '@testing-library/react';
import AddProductContent from './AddProductContent';
import { CategoryCheckboxProvider } from '../../../context/checkboxProvider';
import { CategoryResponse } from '../../../types/category';

jest.mock('../../../hooks/useFormikValues', () => ({
    __esModule: true,
    default: () => ({ addNewValue: jest.fn() }),
}));

jest.mock('@mdxeditor/editor', () => ({
    MDXEditor: () => 'MDXEditor'
}));

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

jest.mock('../../MarkDownEditor/EnhancedMdxEditorComponent', () => {
    return {
        __esModule: true,
        default: ({ content }: any) => <textarea aria-label="content" defaultValue={content}></textarea>, 
    };
});

describe('AddProductContent', () => {
  const setContent = jest.fn();
  const setResetImages = jest.fn();
  const categories = [
    {
      id: '1',
      title: 'Category 1',
      description: 'Description 1',
      imageSrc: 'image1.jpg',
      dateCreated: '2022-01-01',
      subcategories: [
        { id: '2', title: 'Subcategory 1', description: 'Subdesc 1', imageSrc: 'subimage1.jpg', dateCreated: '2022-01-02' },
        { id: '3', title: 'Subcategory 2', description: 'Subdesc 2', imageSrc: 'subimage2.jpg', dateCreated: '2022-01-03' },
      ],
    },
    {
      id: '4',
      title: 'Category 2',
      description: 'Description 2',
      imageSrc: 'image2.jpg',
      dateCreated: '2022-01-04',
      subcategories: [],
    },
  ];

  const checkedCategories = {
    '1': true,
    '2': true,
    '3': false,
    '4': false,
  };

  const componentKey = 1;
  const lastRequestStatus = false;

  test('renders the component correctly', () => {
    render(
      <CategoryCheckboxProvider> 
        <AddProductContent
          setContent={setContent}
          content=""
          resetImages={false}
          setResetImages={setResetImages}
          categories={categories as unknown as CategoryResponse[]}
          checkedCategories={checkedCategories}
          componentKey={componentKey}
          lastRequestStatus={lastRequestStatus}
        />
      </CategoryCheckboxProvider>
    );

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('price')).toBeInTheDocument();
    expect(screen.getByLabelText('discount')).toBeInTheDocument();
    expect(screen.getByLabelText('size')).toBeInTheDocument();
    expect(screen.getByLabelText('stock')).toBeInTheDocument();
    expect(screen.getByLabelText('location')).toBeInTheDocument();
    expect(screen.getByText('Public')).toBeInTheDocument();

    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Subcategory 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Subcategory 2')).toBeInTheDocument();
  });
});
