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
import SearchAppBar from '../../components/search-bar/search-bar';
import { useState } from 'react';

const HomePage = () => {
    const [filteredKnives, setFilteredKnives] = useState<Knife[] | null>(null);
    const { data: knives, error } = useSWR<Knife[]>('/knives', fetchKnives);

    const handleSearchResults = (results: Knife[] | null) => {
        setFilteredKnives(results);
    };

    const displayKnives = filteredKnives || knives;

    if (error) return <Notfound />;
    if (!knives) return <WaitLoading />;

    return (
        <div className="homepage">
            {knives.length === 0 && <IsEmpty />}
            <div className="search-bar">
                <SearchAppBar onSearchResults={handleSearchResults} />
            </div>
            <section className="knives-grid">
                {displayKnives && displayKnives.length > 0 ? (
                    displayKnives.map((knife) => (
                        <Link to={`/product/${knife._id}`} key={knife._id} className="knife-card">
                            <img src={knife.images?.[0] || '/default-image.jpg'} alt={knife.name} className="knife-img" />
                            <h3>{knife.name}</h3>
                            <p>${knife.price.toFixed(2)}</p>
                        </Link>
                    ))
                ) : (
                    <p>No knives found.</p>
                )}
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
