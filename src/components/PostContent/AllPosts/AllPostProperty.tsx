import { FunctionComponent, useCallback } from 'react';
import { deleteAction } from '../../../redux/actions/actions';
import { useAppDispatch } from '../../../hooks/useRedux';
import { Post } from '../../../types/post';
import PostContext from './PostContext';
import { useNavigate } from 'react-router-dom';
import { EDIT_BLOG_URL } from '../../../constants/apiConst';

interface AllPostPropertyProps {
    posts: Post[];
    URL: string;
}

const AllPostProperty: FunctionComponent<AllPostPropertyProps> = ({ URL, posts }) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleEdit = useCallback((id: string) => {
        navigate(`${EDIT_BLOG_URL}${id}`);
    }, [navigate]);

    const onRemove = useCallback((id: string) => {
        dispatch(deleteAction(URL, id))
    }, [URL, dispatch]);

    return (
        <div className={'styles.editPropertyContainer'}>
            {Object.values(posts).map((post, index) => (
                <PostContext
                    key={index}
                    post={post}
                    onEdit={handleEdit}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default AllPostProperty;
