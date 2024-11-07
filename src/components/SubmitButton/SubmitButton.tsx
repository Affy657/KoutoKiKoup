import React from 'react';
import {Button} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

type SubmitButtonProps = {
  onClick: () => void;
  label: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, label }) => (
  <Button
      variant="contained"
      color="success"
      onClick={onClick}
      startIcon={<DoneIcon />}
      sx={{
        padding: '10px 15px',
        margin: '10px 0',
        marginRight: '20px',
      }}
  >
    {label}
  </Button>
);

export default SubmitButton;
