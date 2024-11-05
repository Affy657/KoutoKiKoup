import React from 'react';
import './DeleteButton.css';

type DeleteButtonProps = {
  onClick: () => void;
  label: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, label }) => (
  <button type="button" className="delete-button" onClick={onClick}>
    {label}
  </button>
);

export default DeleteButton;
