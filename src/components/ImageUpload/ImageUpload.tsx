import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {ChangeEvent} from "react";
import Box from "@mui/material/Box";

type ImageUploadProps = {
  image: FileList | null;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function ImageUpload({ image, onImageChange }: ImageUploadProps) {
    return (
        <Box>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                    padding: '10px 15px',
                    margin: '10px 0',
                    marginRight: '20px',
                }}
            >
                Upload Image
                <VisuallyHiddenInput
                    type="file"
                    onChange={onImageChange}
                    accept={'image/*'}
                />
            </Button>
            {image && <p>Selected file: {image[0].name}</p>}
        </Box>
    );
}

export default ImageUpload;
