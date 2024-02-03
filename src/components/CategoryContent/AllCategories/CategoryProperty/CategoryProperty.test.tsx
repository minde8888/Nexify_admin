import '@testing-library/jest-dom/extend-expect';
import CategoryProperty from './CategoryProperty';
import { renderWithReduxMemoryRouter } from '../../../../testUtils/RenderBrowserWithContext';
import { CATEGORIES_URL } from '../../../../constants/apiConst';

// jest.mock('../../../../redux/actions/actions.ts', () => ({
//     deleteAction: jest.fn().mockImplementation(() => () => Promise.resolve('Mocked action')),
// }));

jest.mock('axios', () => ({
    create: jest.fn(() => ({
        interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() },
        },
    })),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useNavigate: () => jest.fn(), 
}));

const initialState = {
    auth: { isLoggedIn: true, },
    categories: {
        data: [],
        lastRequestStatus: null
    }
};

describe('CategoryProperty', () => {
    
    const categories = [
        { id: '1', categoryName: 'Category 1', description: 'Description 1', imageSrc: '', dateCreated: '2021-01-01T00:00:00Z', subcategories: [] },
        { id: '2', categoryName: 'Category 2', description: 'Description 2', imageSrc: '', dateCreated: '2021-02-01T00:00:00Z', subcategories: [] },
    ];

    const setup = async () => {
        const utils = renderWithReduxMemoryRouter(<CategoryProperty categories={categories} URL={CATEGORIES_URL} />, { initialState });
        return {
            ...utils
        };
    };

    test('renders', async () => {
        const { baseElement } = await setup();
        expect(baseElement).toBeVisible();
    });
});
