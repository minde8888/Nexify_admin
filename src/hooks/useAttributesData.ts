import { useParams } from 'react-router-dom';
import { useAppSelector } from './useRedux';
import { Attributes } from '../types/attributes';

const useAttributeData = () => {
    const { id } = useParams<{ id: string }>();
    const { data, lastRequestStatus } = useAppSelector((state) => state.data.attributes as {data: Record<string, Attributes>, lastRequestStatus: boolean});

    const entityId = id?.toString();
    const attribute = Object.values(data).find((item) => item.id === entityId) || { attributeName: '', imageDescription: '', imageName: '' };

    const {attributeName,  imageName} = attribute;

    return {
        lastRequestStatus,
        attributeName, 
        imageName,
        id
    };
};

export default useAttributeData;
