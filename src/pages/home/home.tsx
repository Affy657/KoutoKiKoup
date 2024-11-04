import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { fetchKnives } from '../../api/api';
import './home.css';
import { Knife } from '../../type';
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NotFoundImage from '../../assets/404.svg';
import IsEmptyImage from '../../assets/no_data.svg';
import Loading from '../../assets/loading.svg';

function HomePage() {
  const { data: knives, error } = useSWR<Knife[]>('/knives', fetchKnives);

    if (error) return <div className="loading-image"><img src={NotFoundImage} alt="404 Not Found" /></div>;
    if (!knives) return <div className="loading-image"><img src={Loading} alt="Loading" /></div>;

  return (
    <div className="homepage">
        {knives.length === 0 && (
            <div className="loading-image"><img src={IsEmptyImage} alt="It's empty" /></div>
        )}
      <section className="knives-grid">
        {knives.map((knife) => (
          <Link to={`/product/${knife._id}`} key={knife._id} className="knife-card">
            <img src={knife.images[0]} alt={knife.name} className="knife-img" />
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
