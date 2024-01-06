import { FormEvent, useCallback } from "react";
import { SelectField } from "../InputFields/SelectField";
import { getAllAction } from "../../redux/actions/actions";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { pageSizeOptions } from "../../constants/pageSize";

interface PageSizeProps {
    setSelectValue: (value: number) => void;
    selectValue: number;
    url: string;
    dispatch: Dispatch<AnyAction>;
    pageNumber: number;
}

const PageSize: React.FC<PageSizeProps> = ({
    setSelectValue,
    selectValue,
    url,
    dispatch,
    pageNumber,
}: PageSizeProps) => {
    const generateQueryString = (pageSize: number) =>
        `${url}?PageNumber=${pageNumber}&PageSize=${pageSize}`;

    const handleSelectChange = useCallback(
        (e: FormEvent<HTMLSelectElement>): void => {
            const selectedValue = parseInt(e.currentTarget.value, 10);
            setSelectValue(selectedValue);
            dispatch(getAllAction(generateQueryString(selectedValue)));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setSelectValue, dispatch, pageNumber, url]
    );

    const renderPageSizeOptions = () =>
        Object.values(pageSizeOptions).map((option) => (
            <option key={option} value={option.toString()}>
                {option}
            </option>
        ));

    return (
        <SelectField
            value={selectValue.toString()} 
            name="pageSize"
            as="select"
            onChange={(e: React.FormEvent<HTMLSelectElement>) => handleSelectChange(e)}
            style={{
                padding: '5px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '60px',
                marginBottom: '10px',
                height: '30px',
            }}
        >
            {renderPageSizeOptions()}
        </SelectField>
    );
};

export default PageSize;
