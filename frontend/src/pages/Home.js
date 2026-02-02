import {useNavigate} from 'react-router-dom';
import './Home.css';
function Home()
{
    const navigate = useNavigate();
    return(
        <div className="landing-hero">
    <h1 className='welcm'>Welcome to StaySmart :)</h1>
    <p>Premium hotels and rooms tailored for you.</p>
    <button className="landing-cta-btn" onClick={() => navigate('/hotels')}>
        Explore All Hotels
    </button>
</div>
    )
}
export default Home;