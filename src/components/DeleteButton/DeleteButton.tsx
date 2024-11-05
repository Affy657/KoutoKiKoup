import React from 'react';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type DeleteButtonProps = {
    onClick: () => void;
    label: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, label }) => {
    return (
        <Button
            variant="contained"
            color="error"
            onClick={onClick}
            startIcon={<DeleteIcon />}
            sx={{
                padding: '10px 15px',
                margin: '10px 0',
                marginRigth: '20px',
            }}
        >
            {label}
        </Button>
    );
}

export default DeleteButton;