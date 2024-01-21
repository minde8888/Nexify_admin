// PageSize.tsx
import React, { FormEvent, useEffect } from "react";
import SelectOptions from "../SelectOptions/SelectOptions";
import { pageSizeOptions } from "../../constants/pageSize";
import { usePagination } from "../Context/PaginationContext";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { useSelectFieldContext } from "../Context/SelectFieldContext";

interface PageSizeProps {
    url: string;
    dispatch: Dispatch<AnyAction>;
}

const PageSize: React.FC<PageSizeProps> = ({ url, dispatch }: PageSizeProps) => {
    const { pageSize, setPageSize, setPageNumber, fetchDataForPage } = usePagination();
    const { selectValue } = useSelectFieldContext();
    const selectValueNumber = parseInt(selectValue, 10);

    useEffect(() => {
        if (!isNaN(selectValueNumber) && selectValueNumber !== pageSize) {
            setPageSize(selectValueNumber); 
            setPageNumber(1); // Reset page number when page size changes
            fetchDataForPage(url, dispatch);
        }
    }, [selectValueNumber, setPageSize, setPageNumber, fetchDataForPage, url, dispatch, pageSize]);


    const style = {
        padding: '5px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '60px',
        marginBottom: '10px',
        height: '30px',
    }

    return (
        <SelectOptions
            options={pageSizeOptions}
            styles={style}
            name="pageSize"
        />
    );
};

export default PageSize;
