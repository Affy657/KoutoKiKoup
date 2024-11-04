import React from 'react';
import './SubmitButton.css'; 

type SubmitButtonProps = {
  onClick: () => void;
  label: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, label }) => (
  <button type="button" className="submit-button" onClick={onClick}>
    {label}
  </button>
);

export default SubmitButton;
