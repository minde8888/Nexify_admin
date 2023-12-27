interface IconButtonProps {
    onClick: () => void;
    icon: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ onClick, icon }) => (
    <span onClick={onClick}>
        <img src={icon} alt="imgAltText" />
    </span>
);