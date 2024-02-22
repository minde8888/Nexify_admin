import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllProductsProperty from './AllProductsProperty';
import { useSelector } from 'react-redux';
import * as actions from '../../../../redux/actions/actions';
import { EDIT_PRODUCT_URL } from '../../../../constants/apiConst';
import { Product } from '../../../../types/product';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: () => jest.fn(),
}));

const mockProduct: Product[] = [
    {
        id: '1',
        title: 'Product 1',
        content: 'Product 1 description',
    },
    {
        id: '2',
        title: 'Product 2',
        content: 'Product 2 description',
    },
    {
        id: '3',
        title: 'Product 3',
        content: 'Product 3 description',
    },
];

describe('AllProductsProperty', () => {
    const initialState = {
        auth: { isLoggedIn: true },
        product: {
            data: [],
            lastRequestStatus: null,
        },
    };

    const setup = () => {
        render(<AllProductsProperty URL="/test-url/" product={mockProduct} />);
    };

    test('renders products correctly', () => {
        setup();
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    test('navigates to edit page on edit action', () => {
        setup();

        fireEvent.click(screen.getAllByAltText('Edit')[0]);

        expect(mockNavigate).toHaveBeenCalledWith(`${EDIT_PRODUCT_URL}1`);
    });

    test('dispatches delete action on remove action', async () => {
        (useSelector as unknown as jest.Mock).mockImplementation((callback: (state: typeof initialState) => any) => callback(initialState));
        jest.spyOn(actions, 'deleteAction').mockImplementation(jest.fn());

        setup();

        fireEvent.click(screen.getAllByTestId('custom-button-1')[0]);

        expect(actions.deleteAction).toHaveBeenCalledWith('/test-url/', '1');
    });
});
