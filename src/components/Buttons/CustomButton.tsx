import { FunctionComponent } from "react";
import React from 'react';
import { ButtonError } from "../../errorHandler/buttonError";

interface CustomButtonProps {
    onClick: () => void;
    style: string;
    symbol: string;
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({ onClick, style, symbol }) => {

    if (typeof style !== 'string' && !React.isValidElement(style)) {
        throw new ButtonError('CustomButton component requires a valid "style" prop, which can be a CSS class (string).');
    }

    return (
        <div className={style}>
            <button type="button" onClick={onClick}>
                {symbol}
            </button>
        </div>
    );
};

export default CustomButton;