import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { fetchKnives } from '../../api/api';
import './home.css';
import { Knife } from '../../type';
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Notfound from "../../components/404/404.tsx";
import WaitLoading from "../../components/Loading/Loading.tsx";
import IsEmpty from "../../components/Empty/Empty.tsx";

const HomePage = () => {
    const { data: knives, error } = useSWR<Knife[]>('/knives', fetchKnives);

    if (error) return <Notfound />;
    if (!knives) return <WaitLoading/>;

    return (
        <div className="homepage">
            {knives.length === 0 && (
                <IsEmpty />
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
};

export default HomePage;
