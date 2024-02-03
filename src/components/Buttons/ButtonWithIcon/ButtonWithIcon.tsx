import React, { CSSProperties } from 'react';
import { ButtonError } from '../../../errorHandler/buttonError';

interface ButtonWithIconProps {
  icon: string;
  altText: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ icon, altText, style, onClick }) => {
  if (!icon || !altText) {
    throw new ButtonError('ButtonWithIcon component requires both "icon" and "altText" props.');
  }

  return (
    <div style={style} data-testid="button-with-icon">
      <button type="button" onClick={onClick} style={{ border: 'none', background: 'none', padding: 0, margin: 0, cursor: 'pointer' }}>
        <img src={icon} alt={altText} />
      </button>
    </div>
  );
};

export default ButtonWithIcon;
