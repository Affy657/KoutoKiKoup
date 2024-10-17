import { useEffect, useState } from 'react';
import { fetchMyProfile, fetchKnivesByUser } from '../../api/api';
import { Link } from 'react-router-dom';
import './myprofile.css';

enum Role {
    User = 'user',
    Admin = 'admin',
}

interface Profile {
    id: string;
    username: string;
    role: Role;
}

interface Knife {
    _id: string;
    name: string;
    price: string;
    image: string;
}

const MyProfile = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [knives, setKnives] = useState<Knife[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loadingKnives, setLoadingKnives] = useState<boolean>(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileResponse = await fetchMyProfile();
                setProfile(profileResponse);

                // Fetch knives associated with the user
                setLoadingKnives(true);
                const knivesResponse = await fetchKnivesByUser(profileResponse.id); // Assuming profile has `id`
                setKnives(knivesResponse);
                setLoadingKnives(false);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('An unknown error occurred');
                }
                setLoadingKnives(false);
            }
        };

        fetchProfile();
    }, []);

    if (error) return <p>{error}</p>;
    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="profile-page">
            <header className="profile-header">
                <h1>My Profile</h1>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Role:</strong> {profile.role === Role.Admin ? 'Administrator' : 'User'}</p>
            </header>

            <section className="knives-section">
                <h2>My Knives</h2>
                {loadingKnives ? (
                    <p>Loading knives...</p>
                ) : knives.length > 0 ? (
                    <div className="knives-grid">
                        {knives.map((knife) => (
                            <Link to={`/product/${knife._id}`} key={knife._id} className="knife-card">
                                <img src={knife.image} alt={knife.name} className="knife-img" />
                                <h3>{knife.name}</h3>
                                <p>{knife.price}</p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No knives found for this user.</p>
                )}
            </section>
        </div>
    );
};

export default MyProfile;
