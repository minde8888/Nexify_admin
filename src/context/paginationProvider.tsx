import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { generateQueryString } from '../utils/helpers/generateQueryString/generateQueryString';
import { getAllAction } from '../redux/actions/actions';
import { useAppDispatch } from '../redux/store';

interface PaginationContextType {
    pageNumber: number;
    pageSize: number;
    setPageSize: (size: number) => void;
    setPageNumber: (number: number) => void;
    resetPageNumber: () => void;
    setUrl: (url: string) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [url, setUrl] = useState<string>('');

    const dispatch = useAppDispatch();

    const fetchDataForPage = () => dispatch(getAllAction(generateQueryString(pageSize, pageNumber, url)));
    
    useEffect(() => {        
        if (url) {
            fetchDataForPage();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, dispatch, pageNumber, pageSize]);

    const resetPageNumber = useCallback(() => {
        setPageNumber(1);
    }, []);

    return (
        <PaginationContext.Provider value={{ pageNumber, pageSize, setPageSize, setPageNumber, resetPageNumber, setUrl }}>
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
