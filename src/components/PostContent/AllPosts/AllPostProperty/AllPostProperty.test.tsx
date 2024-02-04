import { fireEvent, screen } from '@testing-library/react';
import AllPostProperty from './AllPostProperty';
import { renderBrowserWithContext } from '../../../../testUtils/RenderBrowserWithContext';
import { Post } from '../../../../types/post';
import { useSelector } from 'react-redux';
import * as actions from '../../../../redux/actions/actions';
import { EDIT_BLOG_URL } from '../../../../constants/apiConst';

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

const posts: Post[] = [
    {
        id: "1",
        title: "Post Title 1",
        content: "Post content 1",
    },
    {
        id: "2",
        title: "Post Title 2",
        content: "Post content 2",
    },
];

describe('AllPostProperty', () => {
    
    const initialState = {
        auth: { isLoggedIn: true, },
        post: {
            data: [],
            lastRequestStatus: null
        }
    };

    const setup = async (URL: string = '', posts: Post[] = []) => {
        const utils = renderBrowserWithContext(<AllPostProperty URL={URL} posts={posts} />);
        return {
            ...utils
        };
    }

    test('renders posts correctly', () => {
        setup('/test-url/', posts);
        expect(screen.getByText('Post Title 1')).toBeInTheDocument();
        expect(screen.getByText('Post Title 2')).toBeInTheDocument();
    });

    test('navigates to edit page on edit action', () => {       
        setup('/test-url/', posts);
        const editButtons = screen.getAllByAltText('Edit'); 
        fireEvent.click(editButtons[0]); 
        expect(mockNavigate).toHaveBeenCalledWith("/edit-post/1");    
    });

    test('dispatches delete action on remove action', async () => {
        (useSelector as unknown as jest.Mock).mockImplementation((callback: (state: typeof initialState) => any) => callback(initialState));
        jest.spyOn(actions, 'deleteAction').mockImplementation(jest.fn());
        setup('/edit-post/', posts);
        const removeButton = await screen.findByTestId(`custom-button-${posts[0].id}`);
        fireEvent.click(removeButton); 
        expect(actions.deleteAction).toHaveBeenCalledWith(EDIT_BLOG_URL, "1");
    });
})
