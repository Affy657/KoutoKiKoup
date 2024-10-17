import { useState } from 'react';
import './addproduct.css';
import TextField from '@mui/material/TextField';

const AddProductPage = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [handle, setHandle] = useState(0);
    const [blade, setBlade] = useState(0);
    const [sharpness, setSharpness] = useState(0);
    const [durability, setDurability] = useState(0);
    const [weight, setWeight] = useState(0);
    const [length, setLength] = useState(0);
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('handle', handle);
        formData.append('blade', blade);
        formData.append('sharpness', sharpness);
        formData.append('durability', durability);
        formData.append('weight', weight);
        formData.append('length', length);
        formData.append('image', image);

        console.log('Product submitted', {
            title, price, description, handle, blade, sharpness, durability, weight, length, image
        });
    };

    return (
        <div className="addproduct-page">
            <header className="header">
                <h1 className="site-title">Kouto Ki Koup</h1>
            </header>

            <section className="addproduct-details">
                <div className="form-group">
                    <TextField
                        id="title"
                        label="Title"
                        variant="standard"
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        variant="standard"
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    <div className="image-upload">
                        <label htmlFor="file-input" className="custom-file-upload">
                            Upload Image
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                        />
                        {image && <p className="file-name">Selected file: {image.name}</p>}
                    </div>
                    <TextField
                        id="price"
                        label="Price"
                        type="number"
                        variant="standard"
                        value={price}
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                    <TextField
                        id="handle"
                        label="Handle"
                        type="number"
                        variant="standard"
                        value={handle}
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setHandle(Number(e.target.value))}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                    <TextField
                        id="blade"
                        label="Blade"
                        type="number"
                        variant="standard"
                        value={blade}
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setBlade(Number(e.target.value))}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                    <TextField
                        id="sharpness"
                        label="Sharpness"
                        type="number"
                        variant="standard"
                        value={sharpness}
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setSharpness(Number(e.target.value))}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                    <TextField
                        id="durability"
                        label="Durability"
                        type="number"
                        variant="standard"
                        value={durability}
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setDurability(Number(e.target.value))}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                    <TextField
                        id="weight"
                        label="Weight"
                        type="number"
                        variant="standard"
                        value={weight}
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                    <TextField
                        id="length"
                        label="Length"
                        type="number"
                        variant="standard"
                        value={length}
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setLength(Number(e.target.value))}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
            </section>
        </div>
    );
};

export default function AppAddProduct() {
    return <AddProductPage/>;
}
