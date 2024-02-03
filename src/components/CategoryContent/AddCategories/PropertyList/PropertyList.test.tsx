import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyList from './PropertyList';

jest.mock('../../../../hooks/useFormProperty', () => ({
    __esModule: true, // This tells Jest that the module being mocked has ES module semantics
    default: () => ({
        addNewProperty: jest.fn(),
        removeProperty: jest.fn(),
        properties: [{ id: '1', name: 'Property 1' }, { id: '2', name: 'Property 2' }],
    }),
}));

jest.mock('../PropertyItem/PropertyItem', () => {
    return function DummyPropertyItem(props: any) {
        return <div data-testid="property-item">{props.property.name}</div>;
    };
});

jest.mock('../../../Buttons/CustomButton/CustomButton', () => {
    return function DummyCustomButton(props: any) {
        return <button data-testid="custom-button">{props.symbol}</button>;
    };
});

jest.mock('formik', () => ({
    ...jest.requireActual('formik'),
    useField: () => [{
        field: { name: 'testName', value: '', onChange: jest.fn(), onBlur: jest.fn() },
        meta: { touched: false, error: '' },
        helpers: { setValue: jest.fn(), setTouched: jest.fn() },
    }],
    ErrorMessage: () => <div>Error</div>,
}));


describe('PropertyList', () => {
    test('renders PropertyItem components based on properties', () => {
        render(<PropertyList prefix="testPrefix" showAddButton={true} level={1} setPrefix={() => { }} />);
        const propertyItems = screen.getAllByTestId('property-item');
        expect(propertyItems.length).toBe(2);
    });

    test('conditionally renders the CustomButton based on showAddButton prop', () => {
        const { rerender } = render(<PropertyList prefix="testPrefix" showAddButton={true} level={1} setPrefix={() => { }} />);
        expect(screen.getByTestId('custom-button')).toBeInTheDocument();

        rerender(<PropertyList prefix="testPrefix" showAddButton={false} level={1} setPrefix={() => { }} />);
        expect(screen.queryByTestId('custom-button')).not.toBeInTheDocument();
    });

    test('renders TextInputField with correct props', () => {
        render(<PropertyList prefix="testPrefix" showAddButton={true} level={1} setPrefix={() => { }} />);
        expect(screen.getByTestId('text-input-field')).toBeInTheDocument();
    });
});
