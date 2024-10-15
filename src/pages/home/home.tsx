import React from 'react';
import './home.css';

const knives = [
  { name: 'Couteau', price: '$78.50', img: 'link-to-image' },
  { name: 'Couto', price: '$44.99', img: 'link-to-image' },
  { name: 'Kouto', price: '$32.80', img: 'link-to-image' },
];

function HomePage() {
  return (
    <div className="homepage">
      <header className="header">
        <h1 className="site-title">Kouto Ki Koup</h1>
        <input className="search-bar" type="text" placeholder="Search Kouto..." />
      </header>

      <section className="knives-grid">
        {knives.map((knife, index) => (
          <div key={index} className="knife-card">
            <img src={knife.img} alt={knife.name} className="knife-img" />
            <h3>{knife.name}</h3>
            <p>{knife.price}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
