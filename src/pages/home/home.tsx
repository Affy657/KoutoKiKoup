import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { fetchKnives } from '../../api/api';
import './home.css';
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function HomePage() {
  const { data: knives, error } = useSWR('/knives', fetchKnives);

  if (error) return <p>Failed to load Kouto</p>;
  if (!knives) return <p>Loading...</p>;

  return (
    <div className="homepage">
      <header className="header">
        <h1 className="site-title">Kouto Ki Koup</h1>
        <input className="search-bar" type="text" placeholder="Search Kouto..." />
      </header>

      <section className="knives-grid">
        {knives.map((knife: { _id: number; name: string; price: string; image: string }) => (
          <Link to={`/product/${knife._id}`} key={knife._id} className="knife-card">
            <img src={knife.image} alt={knife.name} className="knife-img" />
            <h3>{knife.name}</h3>
            <p>{knife.price}</p>
          </Link>
        ))}
        <Link to="/addproduct" className="add-knife-card">
          <Fab color="secondary" aria-label="add">
              <AddIcon />
          </Fab>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
