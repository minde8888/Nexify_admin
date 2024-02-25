import '@testing-library/jest-dom/extend-expect';
import ComponentProperty from './ComponentProperty';
import { renderWithReduxMemoryRouter } from '../../testUtils/RenderBrowserWithContext';
import { CATEGORIES_URL } from '../../constants/apiConst';
import { fireEvent, screen } from '@testing-library/react';
import * as actions from '../../redux/actions/actions';
import { useSelector } from 'react-redux';
import DataType from '../../types/dataType';

jest.mock('axios', () => ({
    create: jest.fn(() => ({
        interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() },
        },
    })),
}));

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

describe('ComponentProperty', () => {

    const initialState = {
        auth: { isLoggedIn: true, },
        categories: {
            data: [],
            lastRequestStatus: null
        }
    };

    const categories = [
        { id: '1', categoryName: 'Category 1', description: 'Description 1', imageSrc: '', dateCreated: '2021-01-01T00:00:00Z', subcategories: [] },
        { id: '2', categoryName: 'Category 2', description: 'Description 2', imageSrc: '', dateCreated: '2021-02-01T00:00:00Z', subcategories: [] },
    ];

    const setup = async () => {
        const utils = renderWithReduxMemoryRouter(<ComponentProperty data={categories as unknown as DataType[]} URL={CATEGORIES_URL} />, { initialState });
        return {
            ...utils
        };
    };

    test('renders', async () => {
        const { baseElement } = await setup();
        expect(baseElement).toBeVisible();
    });

    test('renders all categories', async () => {
        await setup();
        const categoryElements = screen.getAllByTestId('data-item');
        expect(categoryElements.length).toBe(categories.length);
    });

    test('navigates to edit URL on edit', async () => {
        await setup();
        const editButtons = await screen.findAllByAltText('Edit');
        fireEvent.click(editButtons[0]);
        expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining(categories[0].id));
    });

    test('navigates to edit URL on edit for the first category', async () => {
        await setup();
        const editButton = await screen.findByTestId(`icon-button-${categories[0].id}`);
        fireEvent.click(editButton);
        expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining(categories[0].id));
    });

    test('dispatches deleteAction with correct parameters on remove', async () => {
        (useSelector as unknown as jest.Mock).mockImplementation((callback: (state: typeof initialState) => any) => callback(initialState));
        jest.spyOn(actions, 'deleteAction').mockImplementation(jest.fn());
        await setup();
        const removeButton = await screen.findByTestId(`custom-button-${categories[0].id}`);
        fireEvent.click(removeButton);
        expect(actions.deleteAction).toHaveBeenCalledWith(CATEGORIES_URL, expect.any(String), expect.any(Boolean));
    });    

    test('displays no categories message when categories array is empty', async () => {
        renderWithReduxMemoryRouter(<ComponentProperty URL={CATEGORIES_URL} />, { initialState });
        expect(screen.getByText('No data available')).toBeVisible();
    });
});
