import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { fetchKnives } from '../../api/api';
import './home.css';
import { Knife } from '../../type';

/*const knives = [
  { id: 1, name: 'Couteau', price: '$78.50', img: 'public/logo.svg' },
  { id: 2, name: 'Couto', price: '$44.99', img: 'public/logo.svg' },
  { id: 3, name: 'Kouto', price: '$32.80', img: 'public/logo.svg' },
  { id: 3, name: 'Kouto', price: '$32.80', img: 'public/logo.svg' },
  { id: 3, name: 'Kouto', price: '$32.80', img: 'public/logo.svg' },
  { id: 3, name: 'Kouto', price: '$32.80', img: 'public/logo.svg' },
  { id: 3, name: 'Kouto', price: '$32.80', img: 'public/logo.svg' },
  { id: 3, name: 'Kouto', price: '$32.80', img: 'public/logo.svg' },
  { id: 3, name: 'Kouto', price: '$32.80', img: 'public/logo.svg' },
];*/

function HomePage() {
  const { data: knives, error } = useSWR<Knife[]>('/knives', fetchKnives);

  if (error) return <p>Failed to load Kouto</p>;
  if (!knives) return <p>Loading...</p>;

  return (
    <div className="homepage">
      <section className="knives-grid">
        {knives.map((knife) => (
          <Link to={`/product/${knife._id}`} key={knife._id} className="knife-card">
            <img src={knife.images[0]} alt={knife.name} className="knife-img" />
            <h3>{knife.name}</h3>
            <p>{knife.price}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
