import { fireEvent, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { renderWithContext } from '../../testUtils/RenderBrowserWithContext';
import { getAllAction } from '../../redux/actions/actions';

const mockDispatch = jest.fn();
const setup = async () => {
    const utils = renderWithContext(<Pagination
        pageNumber={1}
        pageSize={10}
        totalPages={5}
        totalRecords={50}
        numButtonsDisplayed={5}
        url="/example"
        dispatch={mockDispatch}
    />);
    return {
        ...utils
    };
}

describe('Pagination', () => {
    test('renders Pagination component correctly', async () => {
        await setup();

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Total Posts: 50')).toBeInTheDocument();
    });


    test('calls dispatch with the correct action when a page button is clicked', async () => {
        await setup();    

        fireEvent.click(screen.getByText('3')); 
        expect(mockDispatch).toHaveBeenCalledWith(getAllAction('/example?PageNumber=3&PageSize=10'));
    });
    
})
