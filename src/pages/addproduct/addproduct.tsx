import { useState, useContext, ChangeEvent } from 'react';
import './addproduct.css';
import ProductForm from '../../components/ProductForm/ProductForm.tsx';
import ImageUpload from '../../components/ImageUpload/ImageUpload.tsx';
import SubmitButton from '../../components/SubmitButton/SubmitButton.tsx';
import { useNavigate } from 'react-router-dom';
import { addKnife } from '../../api/api';
import { UserContext } from "../../contexts/Users";

const AddProductPage = () => {
    const navigate = useNavigate();
    const { current: userId } = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        handle: '',
        blade: '',
        sharpness: 0,
        durability: 0,
        weight: 0,
        length: 0,
    });
    const [image, setImage] = useState<FileList | null>(null);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: ['price', 'sharpness', 'durability', 'weight', 'length'].includes(name)
                ? Number(value)
                : value,
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files);
        }
    };

    const handleSubmit = async () => {
        if (!userId) {
            console.error('User ID is null');
            return;
        }

        try {
            const dataToSubmit = { ...formData, images: image };

            const knifeData = new FormData();
            for (const [key, value] of Object.entries(dataToSubmit)) {
                if (value === null) continue;
                if (key === 'images' && value instanceof FileList) {
                    Array.from(value).forEach((file) => {
                        knifeData.append(key, file);
                    });
                } else {
                    knifeData.append(key, String(value));
                }
            }

            await addKnife(knifeData, userId._id);
            console.log('Product created successfully');
            navigate('/');
        } catch (error) {
            alert('Error submitting product');
            console.error('Error submitting product:', error);
        }
    };

    return (
        <div className="addproduct-page">
            <section className="addproduct-details">
                <ProductForm {...formData} onChange={handleChange} />
                <ImageUpload image={image} onImageChange={handleImageChange} />
                <SubmitButton onClick={handleSubmit} label="Add Product" />
            </section>
        </div>
    );
};

export default AddProductPage;
