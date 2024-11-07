import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { fetchKnives } from '../../api/api';
import './home.css';
import { Knife } from '../../type';
import SearchAppBar from '../../components/search-bar/search-bar';
import { useState } from 'react';

function HomePage() {
  const [filteredKnives, setFilteredKnives] = useState(null);
  const { data: knives, error } = useSWR<Knife[]>('/knives', fetchKnives);

  if (error) return <p>Failed to load Kouto</p>;
  if (!knives) return <p>Loading...</p>;

  const handleSearchResults = (results) => {
    setFilteredKnives(results);
  };

  const displayKnives = filteredKnives || knives;

  return (
    <div className="homepage">
      <div className="search-bar">
        <SearchAppBar onSearchResults={handleSearchResults} />
      </div>
      <section className="knives-grid">
        {displayKnives.map((knife) => (
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
