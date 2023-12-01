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
            width: "100%",
            height: "200px",
            objectFit: "contain",
          }}
        />
      )}
    </>
  );
};

export default PropertyImagePreview;
