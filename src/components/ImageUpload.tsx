import React, { ChangeEvent } from 'react';
import './ImageUpload.css';


type ImageUploadProps = {
  image: File | null;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ image, onImageChange }) => (
  <div className="image-upload">
    <label htmlFor="file-input" className="custom-file-upload">
      Upload Image
    </label>
    <input
      id="file-input"
      type="file"
      onChange={onImageChange}
      accept="image/*"
    />
    {image && <p className="file-name">Selected file: {image.name}</p>}
  </div>
);

export default ImageUpload;
