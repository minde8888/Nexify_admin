import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { getAllAction } from '../../redux/actions/actions';


interface Props {
    firstPage: number;
    lastPage: number;
    nextPage: number;
    previousPage: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    size: number;
    url: string;
}

const Pagination: React.FC<Props> = ({
    firstPage,
    lastPage,
    nextPage,
    previousPage,
    pageNumber,
    pageSize,
    totalPages,
    totalRecords,
    size,
    url
}: Props) => {
    const dispatch = useAppDispatch();

    const onClick = async (pageNum: number | null) => {
        if (true) {
            dispatch(getAllAction(`${url}?PageNumber=${pageNum}&PageSize=${size}`));
        }
    };

    const renderButton = (pageNum: number | null, label: string) => (
        <button
            type='button'
            key={label}
            onClick={() => onClick(pageNum)}
            disabled={pageNum === null || pageNum === pageNumber}
        >
            {label}
        </button>
    );

    return (
        <nav className="pagination" aria-label="Pagination">
            {renderButton(previousPage, 'Previous')}
            {[pageNumber - 1, pageNumber, pageNumber + 1]
                .filter(pageNum => pageNum > 0 && pageNum <= totalPages)
                .map(pageNum => renderButton(pageNum, pageNum.toString()))
            }
            {renderButton(nextPage, 'Next')}
        </nav>
    );
};

export default Pagination;
