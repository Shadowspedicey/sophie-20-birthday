import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import ThroneRoom from './ThroneRoom';
import Gallery from './Gallery';
import NailSalon from './NailSalon';
import LeagueProfile from './LeagueProfile';

function App() {
  return (
	<>
		<nav>
			<Link to="/">Throne Room</Link>
			<Link to="/gallery">Gallery</Link>
			<Link to="/nail-salon">Nail Salon</Link>
			<Link to="/league-profile">Suna League Profile</Link>
		</nav>
		<main>
			<Routes>
				<Route path="/" element={<ThroneRoom />} />
				<Route path="/gallery" element={<Gallery />} />
				<Route path="/nail-salon" element={<NailSalon />} />
				<Route path="/league-profile" element={<LeagueProfile />} />
			</Routes>
		</main>
	</>
  )
}

export default App
