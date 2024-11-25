import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

interface ProductFormProps {
    name: string;
    price: number;
    description: string;
    handle: string;
    blade: string;
    sharpness: number;
    durability: number;
    weight: number;
    length: number;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

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

    const handleOptions = [
        "wood",
        "horn",
        "metal",
        "stone",
        "glass",
        "plastic",
        "composite",
        "rubber",
        "leather",
        "bone",
        "ivory",
        "paper",
        "cord",
        "other"
    ];

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        onChange({
            target: {
                name,
                value,
            },
        } as ChangeEvent<HTMLInputElement | HTMLSelectElement>);
    };


    return (
        <div className="form-group">
            <TextField
                id="name"
                label="Name"
                variant="standard"
                sx={{padding: '10px 10px', width: '100%'}}
                value={name}
                onChange={onChange}
                name="name"
            />
            <TextField
                id="description"
                label="Description"
                variant="standard"
                sx={{padding: '10px 10px', width: '100%'}}
                value={description}
                onChange={onChange}
                name="description"
            />
            <TextField
                id="price"
                label="Price"
                type="number"
                variant="standard"
                sx={{padding: '10px 10px', width: '100%'}}
                value={price}
                onChange={onChange}
                name="price"
                inputProps={{step: "0.01", min: "0.01"}}
            />

            <FormControl variant="standard" sx={{padding: '10px 10px', width: '100%'}}>
                <InputLabel id="handle-label">Handle</InputLabel>
                <Select
                    labelId="handle-label"
                    id="handle"
                    value={handle}
                    onChange={handleSelectChange}
                    name="handle"
                    label="Handle"
                >
                    {handleOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="standard" sx={{padding: '10px 10px', width: '100%'}}>
                <InputLabel id="blade-label">Blade</InputLabel>
                <Select
                    id="blade"
                    label="Blade"
                    variant="standard"
                    sx={{padding: '10px 10px'}}
                    value={blade}
                    onChange={handleSelectChange}
                    name="blade"
                >
                    {handleOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                id="sharpness"
                label="Sharpness"
                type="number"
                variant="standard"
                sx={{padding: '10px 10px', width: '100%'}}
                value={sharpness}
                onChange={onChange}
                name="sharpness"
                inputProps={{min: "0", max: "10"}}
            />
            <TextField
                id="durability"
                label="Durability"
                type="number"
                variant="standard"
                sx={{padding: '10px 10px', width: '100%'}}
                value={durability}
                onChange={onChange}
                name="durability"
                inputProps={{min: "0", max: "10"}}
            />
            <TextField
                id="weight"
                label="Weight"
                type="number"
                variant="standard"
                sx={{padding: '10px 10px', width: '100%'}}
                value={weight}
                onChange={onChange}
                name="weight"
                inputProps={{step: "0.01", min: "0.01"}}
            />
            <TextField
                id="length"
                label="Length"
                type="number"
                variant="standard"
                sx={{padding: '10px 10px', width: '100%'}}
                value={length}
                onChange={onChange}
                name="length"
                inputProps={{step: "0.01", min: "0.01"}}
            />
        </div>
    );
};

export default ProductForm;