import { render, fireEvent, screen } from '@testing-library/react';
import PostContext from './PostContext';
import { Post } from '../../../../types/post';

jest.mock('../../../Buttons/ButtonWithIcon/ButtonWithIcon', () => (props: any) => (
    <button onClick={props.onClick} data-testid="edit-button">{props.altText}</button>
));
jest.mock('../../../Buttons/CustomButton/CustomButton', () => (props: any) => (
    <button onClick={props.onClick} data-testid="remove-button">{props.symbol}</button>
));
jest.mock('react-lazy-load-image-component', () => ({
    LazyLoadImage: ({ alt }: any) => <img alt={alt} data-testid="post-image" />
}));
jest.mock('../../../MDXToHTMLConverter/MDXToHTMLConverter', () => ({ mdxString }: any) => (
    <div data-testid="mdx-converter">{mdxString}</div>
));

describe('PostContext', () => {
    const mockOnRemove = jest.fn();
    const mockOnEdit = jest.fn();
    const post: Post = {
        id: '1',
        title: 'Test Post',
        content: 'This is a test post content.',
        imageName: 'test-image.jpg',
        categories: [{ id: '1', categoryName: 'Test Category' }],
    };

    const setup = async () => {
        const utils =  render(<PostContext post={post} onRemove={mockOnRemove} onEdit={mockOnEdit} />);
        return {
            ...utils
        };
    };

    test('renders post information correctly', async () => {
        await setup();

        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByTestId('mdx-converter')).toHaveTextContent(post.content || '');
        expect(screen.getByTestId('post-image')).toHaveAttribute('alt', post.title);
        expect(screen.getByText('Categories')).toBeInTheDocument();
        expect(screen.getByText('Test Category')).toBeInTheDocument();
    });

    test('calls onEdit with the post id when edit button is clicked', async () => {
        await setup();

        fireEvent.click(screen.getByTestId('edit-button'));
        expect(mockOnEdit).toHaveBeenCalledWith(post.id);
    });

    test('calls onRemove with the post id when remove button is clicked', async () => {
        await setup();
        
        fireEvent.click(screen.getByTestId('remove-button'));
        expect(mockOnRemove).toHaveBeenCalledWith(post.id);
    });
});
