import React from "react";

interface PropertyImagePreviewProps {
  imagePreviewUrl: string;
}

const PropertyImagePreview: React.FC<PropertyImagePreviewProps> = ({
  imagePreviewUrl,
}) => {
  return (
    <>
      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="Preview"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
          }}
        />
      )}
    </>
  );
};

export default PropertyImagePreview;
