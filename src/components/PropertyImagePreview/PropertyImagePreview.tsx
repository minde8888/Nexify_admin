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
            width: "300px",
            height: "250px",
            objectFit: "contain",
          }}
        />
      )}
    </>
  );
};

export default PropertyImagePreview;
