import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { fetchKnifeById } from '../../api/api';
import './product.css';
import Loading from "../../components/Loading/Loading.tsx";
import Notfound from "../../components/404/404.tsx";


const ProductPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { data: knife, error } = useSWR(id ? `/knives/${id}` : null, () => id ? fetchKnifeById(id) : null);

  if (error) return <Notfound />;
  if (!knife) return <Loading />;

  const handleEditClick = () => {
    navigate(`/editproduct/${id}`);
  };

  return (
    <div className="product-page">

      <section className="product-details">
        <div className="image-section">
          <img src={knife.image} alt={knife.name} className="knife-image" />
        </div>
        <div className="info-section">
          <h2>{knife.name}</h2>
          <p className="price">${knife.price.toFixed(2)}</p>
          <p className="description">{knife.description}</p>

          <div className="attributes">
            <p><strong>Handle:</strong> {knife.handle}</p>
            <p><strong>Blade:</strong> {knife.blade}</p>
            <p><strong>Sharpness:</strong> {knife.sharpness}/10</p>
            <p><strong>Durability:</strong> {knife.durability}/10</p>
            <p><strong>Weight:</strong> {knife.weight}g</p>
            <p><strong>Length:</strong> {knife.length}cm</p>
          </div>
        <div className="button-section">
          <button className="edit-product-button" onClick={handleEditClick}>Edit</button>
        </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
