import React, { createContext, useState, useContext, useCallback } from 'react';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { generateQueryString } from '../../utils/helpers/generateQueryString';
import { getAllAction } from '../../redux/actions/actions';

interface PaginationContextType {
    pageNumber: number;
    pageSize: number;
    setPageSize: (size: number) => void;
    setPageNumber: (number: number) => void;
    fetchDataForPage: (url: string, dispatch: Dispatch<AnyAction>) => void;
    resetPageNumber: () => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);    

    const fetchDataForPage = useCallback((url: string, dispatch: Dispatch<AnyAction>) => {
        console.log(pageSize);
        dispatch(getAllAction(generateQueryString(pageSize, pageNumber, url)));
    }, [pageNumber, pageSize]);

    const resetPageNumber = useCallback(() => {
        setPageNumber(1);
    }, []);

    return (
        <PaginationContext.Provider value={{ pageNumber, pageSize, setPageSize, setPageNumber, fetchDataForPage, resetPageNumber }}>
            {children}
        </PaginationContext.Provider>
    );
};


export const usePagination = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error('usePagination must be used within a PaginationProvider');
    }
    return context;
};
