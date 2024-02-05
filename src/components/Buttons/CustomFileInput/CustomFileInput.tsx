import React, { useState } from 'react';

interface CustomFileInputProps {
  icon: string;
  altText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  icon,
  altText,
  onChange,
  accept,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      if (accept && !accept.includes(selectedFile.type)) {
        setIsValid(false);
        setErrorMessage('Invalid file type. Please select a valid image file.');
      } else {
        setIsValid(true);
        setErrorMessage('');
      }
    }
    onChange(event);
  };

  return (
    <>
      <div style={{ display: !isValid ? 'none' : '' }}>
        <label htmlFor="inputTag">
          <img src={icon} alt={altText} />
          <input
            id="inputTag"
            type="file"
            onChange={handleFileChange}
            accept={accept}
            style={{ display: 'none' }}
            aria-label={altText}
            data-testid="file-input"
          />
        </label>
      </div>
      {!isValid && <div style={{ color: 'red', fontSize: '11px' }}>{errorMessage}</div>}
    </>
  );
};

export default CustomFileInput;
