import React from 'react';
import { getAllAction } from '../../redux/actions/actions';
import style from './pagination.module.scss';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { generateQueryString } from '../../utils/helpers/generateQueryString/generateQueryString';

interface PaginationProps {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    numButtonsDisplayed: number;
    url: string;
    dispatch: Dispatch<AnyAction>;
}

const Pagination: React.FC<PaginationProps> = ({
    pageNumber,
    pageSize,
    totalPages,
    totalRecords,
    numButtonsDisplayed,
    url,
    dispatch
}: PaginationProps) => {

    const numPages = totalPages < numButtonsDisplayed ? totalPages : numButtonsDisplayed;

    const handleButtonClick = async (pageNum: number | null) => {
        if (pageNum !== null && pageNum >= 1 && pageNum <= totalPages) {
            dispatch(getAllAction(generateQueryString(pageSize, pageNum, url)));
        }
    };

    const renderButton = (pageNum: number | null, label: string) => (
        <button
            type='button'
            key={label}
            onClick={() => handleButtonClick(pageNum)}
            disabled={pageNum === null || pageNum === pageNumber || pageNum < 1 || pageNum > totalPages}
        >
            {label}
        </button>
    );

    const renderPaginationButtons = () => {
        const startPage = Math.max(1, pageNumber - numPages);
        const endPage = Math.min(totalPages, pageNumber + numPages);

        const buttons = Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNum = startPage + index;
            return renderButton(pageNum, pageNum.toString());
        });

        return (
            <>
                {renderButton(pageNumber - 1, 'Previous')}
                {buttons}
                {renderButton(pageNumber + 1, 'Next')}
            </>
        );
    };

    return (
        <nav className={style.pagination} aria-label="Pagination">
            {renderPaginationButtons()}
            <div className={style.totalPosts}>
                <span>Total Posts: {totalRecords}</span>
            </div>
        </nav>
    );
};

export default Pagination;
