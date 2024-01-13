import React from "react";

interface PropertyImagePreviewProps {
  imagePreviewUrl: string;
  width?: string;
  height?: string;
}

const PropertyImagePreview: React.FC<PropertyImagePreviewProps> = ({
  imagePreviewUrl,
  width = "400px",
  height = "400px",

}) => {
  return (
    <>
      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="Preview"
          style={{
            width: width,
            height: height,
            objectFit: "contain",
          }}
        />
      )}
    </>
  );
};

export default PropertyImagePreview;
