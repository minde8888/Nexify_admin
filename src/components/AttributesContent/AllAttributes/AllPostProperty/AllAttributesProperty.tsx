import { FunctionComponent, useCallback } from 'react';
import { Attributes } from '../../../../types/attributes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/store';
import { EDIT_ATTRIBUTES_URL } from '../../../../constants/apiConst';
import { deleteAction } from '../../../../redux/actions/actions';
import AttributeContext from '../AttributeContext/AttributeContext';
import styles from '../../../../styles/allPost.module.scss'

interface AllAttributesPropertyProps {
    attributes: Attributes[];
    URL: string;
}

const AllAttributesProperty: FunctionComponent<AllAttributesPropertyProps> = ({ URL, attributes }) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleEdit = useCallback((id: string) => {
        navigate(`${EDIT_ATTRIBUTES_URL}${id}`);
    }, [navigate]);

    const onRemove = useCallback((id: string) => {
        dispatch(deleteAction(URL, id))
    }, [URL, dispatch]);

    return (
        <div className={styles.editPropertyContainer}>
            {Object.values(attributes).map((attribute, index) => (
                <AttributeContext
                    key={index}
                    attribute={attribute}
                    onEdit={handleEdit}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default AllAttributesProperty;
