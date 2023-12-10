import { FunctionComponent } from "react";

interface RemoveButtonProps {
    onClick: () => void;
    style: string;
}

const RemoveButton: FunctionComponent<RemoveButtonProps> = ({ onClick, style }) => (
    <div className={style}>
        <button type="button" onClick={onClick}>
            -
        </button>
    </div>
);

export default RemoveButton;