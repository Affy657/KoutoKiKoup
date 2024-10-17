import { useParams } from 'react-router-dom';
import './product.css';

const ProductPage = () => {
  const { id } = useParams(); 
  const knife = id ? knifeData.find((k) => k.id === parseInt(id)) : undefined;

  if (!knife) {
    return <p>Kouto not found!</p>;
  }
  return (
    <div className="product-page">
      <header className="header">
        <h1 className="site-title">Kouto Ki Koup</h1>
      </header>

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
        </div>
      </section>
    </div>
  );
};

const knifeData = [
  {
    id: 1,
    name: 'SAB1 Knife',
    image: 'public/logo.svg',
    description: 'A high-quality chef knife with superior sharpness and durability.',
    handle: 'Wood',
    blade: 'Stainless Steel',
    sharpness: 9,
    price: 79.99,
    durability: 8,
    weight: 200,
    length: 30,
  },
  {
    id: 2,
    name: 'SNIFE',
    image: 'public/logo.svg',
    description: 'A precision knife for everyday use.',
    handle: 'Plastic',
    blade: 'Carbon Steel',
    sharpness: 8,
    price: 44.99,
    durability: 7,
    weight: 180,
    length: 25,
  },
];

export default ProductPage;
