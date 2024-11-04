import { useState, ChangeEvent } from 'react';
import './addproduct.css';
import ProductForm from '../../components/ProductForm';
import ImageUpload from '../../components/ImageUpload';
import SubmitButton from '../../components/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { addKnife } from '../../api/api';
import { Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
    handle: '',
    blade: '',
    sharpness: 0,
    durability: 0,
    weight: 0,
    length: 0,
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'sharpness' || name === 'durability' || name === 'weight' || name === 'length' ? Number(value) : value
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = { ...formData, image };
      await addKnife(dataToSubmit);
      console.log('Product created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

    const handleBack = () => {
        navigate('/');
    }

  return (
    <div className="addproduct-page">
        <Fab
            variant="extended"
            onClick={handleBack}
            style={{
                position: "fixed",
                left: "10%",
                top: "30%",
                transform: "translateY(-50%)"
            }}
        >
            <NavigationIcon style={{ transform: "rotate(-90deg)" }} />
        </Fab>
         <section className="addproduct-details">
        <ProductForm {...formData} onChange={handleChange} />
        <ImageUpload image={image} onImageChange={handleImageChange} />
        <SubmitButton onClick={handleSubmit} label="Add Product" />
         </section>
    </div>
  );
};

export default AddProductPage;
