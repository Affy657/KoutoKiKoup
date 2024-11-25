import { useState, useEffect, ChangeEvent } from 'react';
import './editproduct.css';
import ProductForm from '../../components/ProductForm/ProductForm.tsx';
import ImageUpload from '../../components/ImageUpload/ImageUpload.tsx';
import SubmitButton from '../../components/SubmitButton/SubmitButton.tsx';
import DeleteButton from '../../components/DeleteButton/DeleteButton.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchKnifeById, updateKnife, deleteKnife } from '../../api/api';

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  type CustomChangeEvent =
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | {
    target: {
      name?: string;
      value: unknown;
    };
  };

  const numericFields = ['price', 'sharpness', 'durability', 'weight', 'length'] as const;

  const isNumericField = (field: string): field is keyof Pick<typeof formData, 'price' | 'sharpness' | 'durability' | 'weight' | 'length'> => {
    return numericFields.includes(field as any);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await fetchKnifeById(id!);
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
          handle: product.handle,
          blade: product.blade,
          sharpness: product.sharpness,
          durability: product.durability,
          weight: product.weight,
          length: product.length,
        });
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: CustomChangeEvent) => {
    if ('target' in e && e.target.name) {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: isNumericField(name) ? Number(value) : value,
      }));
    }
  };



  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files);
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = { ...formData, image };
      await updateKnife(id!, dataToSubmit);
      console.log('Product updated successfully');
      navigate(`/product/${id}`);
    } catch (error) {
      alert('You need to be logged in to edit a product');
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteKnife(id!);
      console.log('Product deleted successfully');
      navigate('/');
    } catch (error) {
      alert('You need to be logged in to delete a product');
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="addproduct-page">
        <section className="addproduct-details">
      <ProductForm {...formData} onChange={handleChange} />
      <ImageUpload image={image} onImageChange={handleImageChange} />
      <SubmitButton onClick={handleSubmit} label="Save Changes" />
      <DeleteButton onClick={handleDelete} label="Delete" />
      </section>
    </div>
  );
};

export default EditProductPage;
