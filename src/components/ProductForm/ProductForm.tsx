import React from 'react';
import TextField from '@mui/material/TextField';

type ProductFormProps = {
  name: string;
  price: number;
  description: string;
  handle: string;
  blade: string;
  sharpness: number;
  durability: number;
  weight: number;
  length: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProductForm: React.FC<ProductFormProps> = ({
  name,
  price,
  description,
  handle,
  blade,
  sharpness,
  durability,
  weight,
  length,
  onChange,
}) => {
  return (
    <div className="form-group">
      <TextField
        id="name"
        label="Name"
        variant="standard"
        sx={{ padding: '10px 10px' }}
        value={name}
        onChange={onChange}
        name="name"
      />
      <TextField
        id="description"
        label="Description"
        variant="standard"
        sx={{ padding: '10px 10px' }}
        value={description}
        onChange={onChange}
        name="description"
      />
      <TextField
        id="price"
        label="Price"
        type="number"
        variant="standard"
        sx={{ padding: '10px 10px' }}
        value={price}
        onChange={onChange}
        name="price"
      />
      <TextField
        id="handle"
        label="Handle"
        variant="standard"
        sx={{ padding: '10px 10px' }}
        value={handle}
        onChange={onChange}
        name="handle"
      />
      <TextField
        id="blade"
        label="Blade"
        variant="standard"
        sx={{ padding: '10px 10px' }}
        value={blade}
        onChange={onChange}
        name="blade"
      />
      <TextField
        id="sharpness"
        label="Sharpness"
        type="number"
        variant="standard"
        sx={{ padding: '10px 10px' }}
        value={sharpness}
        onChange={onChange}
        name="sharpness"
      />
      <TextField
        id="durability"
        label="Durability"
        type="number"
        variant="standard"
        sx={{ padding: '10px 10px' }}
        value={durability}
        onChange={onChange}
        name="durability"
      />
      <TextField
        id="weight"
        label="Weight"
        type="number"
        variant="standard"
        sx={{ padding: '10px 10px' }}
        value={weight}
        onChange={onChange}
        name="weight"
      />
      <TextField
        id="length"
        label="Length"
        type="number"
        variant="standard"
        sx={{ padding: '10px 10px' }}
        value={length}
        onChange={onChange}
        name="length"
      />
    </div>
  );
};

export default ProductForm;
