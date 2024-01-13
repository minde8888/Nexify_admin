import { FunctionComponent } from "react";
import React from 'react';
import { ButtonError } from "../../errorHandler/buttonError";

interface RemoveButtonProps {
    onClick: () => void;
    style: string ; 
}

const RemoveButton: FunctionComponent<RemoveButtonProps> = ({ onClick, style }) => {

    if (typeof style !== 'string' && !React.isValidElement(style)) {
        throw new ButtonError('RemoveButton component requires a valid "style" prop, which can be a CSS class (string).');
    }

    return (
        <div className={style}>
            <button type="button" onClick={onClick}>
                -
            </button>
        </div>
    );
};

export default RemoveButton;
