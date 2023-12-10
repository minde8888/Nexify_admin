import React from 'react';

interface ButtonWithIconProps {
  icon: string;
  altText: string;
  style: string; 
  onClick?: () => void; 
}

const ButtonWithIcon: React.FunctionComponent<ButtonWithIconProps> = ({ icon, altText, style, onClick }) => (
  <div className={style}>
    <button type="button" onClick={onClick}>
      <img src={icon} alt={altText} />
    </button>
  </div>
);

export default ButtonWithIcon;
