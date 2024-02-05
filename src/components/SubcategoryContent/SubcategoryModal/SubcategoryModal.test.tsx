import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubcategoryModal from './SubcategoryModal';

interface ModalProps {
    isOpen: boolean;
    toggle: () => void;
    children: React.ReactNode;
}

jest.mock('../../Modal/Modal', () => ({
    Modal: ({ isOpen, toggle, children }: ModalProps) => (
        isOpen ? <div role="dialog" onClick={toggle}>{children}</div> : null
    ),
}));

jest.mock('../../Buttons/CustomButton/CustomButton', () => () => <button>Mock Button</button>);
jest.mock('../../CategoryContent/AddCategories/CategoriesProperty/CategoriesProperty', () => () => <div>Mock CategoriesProperty</div>);

jest.mock('formik', () => ({
    ...jest.requireActual('formik'),
    useFormikContext: () => ({
        setFieldValue: jest.fn(),
        resetForm: jest.fn(),
        values: { categoryId: '' },
    }),
}));

describe('PropertyImagePreview Component', () => {
    test('renders the modal when isOpen is true', () => {
        const toggle = jest.fn();
        render(<SubcategoryModal isOpen={true} toggle={toggle} id="testId" setPrefix={() => { }} formikRef={createRef()} />);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Add Product Subcategories')).toBeInTheDocument();
        expect(screen.getByText('Mock Button')).toBeInTheDocument();
        expect(screen.getByText('Mock CategoriesProperty')).toBeInTheDocument();
    });
});