import { useState, ChangeEvent, FormEvent } from 'react';
import './addproduct.css';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddProductPage = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [handle, setHandle] = useState('');
    const [blade, setBlade] = useState('');
    const [sharpness, setSharpness] = useState(0);
    const [durability, setDurability] = useState(0);
    const [weight, setWeight] = useState(0);
    const [length, setLength] = useState(0);
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = {
            name: title,
            price: price,
            description: description,
            handle: handle,
            blade: blade,
            sharpness: sharpness,
            durability: durability,
            weight: weight,
            length: length,
            image: image
        }

        try {
            console.log('formData:', formData);
            await axios.post('http://localhost:3000/knives', formData);
            alert('Product created successfully');
            navigate('/');

        } catch (err) {
            const error = err as { response?: { data: string }, message: string };
            console.error('Error submitting product:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="product-page">
            <header className="header">
                <h1 className="site-title">Kouto Ki Koup</h1>
            </header>

            <section className="product-details">
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
                        variant="standard"
                        value={handle}
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setHandle(e.target.value)}
                    />
                    <TextField
                        id="blade"
                        label="Blade"
                        variant="standard"
                        value={blade}
                        sx={{ padding: '10px 10px' }}
                        onChange={(e) => setBlade(e.target.value)}
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