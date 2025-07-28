import sunaProfilePic from "./assets/suna-pfp.png";
import data from "./league-data.json";
import videoIcon from "./assets/video.png";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";

export default function LeagueProfile() {
	const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState(false);
	const [currentKillN, setCurrentKillN] = useState(1);
	const [currentClipN, setCurrentClipN] = useState(1);

	function showClip(killN, clipN) {
		setCurrentKillN(killN);
		setCurrentClipN(clipN);
		setIsVideoPlayerVisible(true);
	}

	return(
		<>
			{isVideoPlayerVisible && <VideoPlayer killN={currentKillN} clipN={currentClipN} hideVideoPlayer={() => setIsVideoPlayerVisible(false)}/>}
			<div id="league-profile" className="fancy-border">
				<div className="info-container">
					<span className="profile-pic">
						<img src={sunaProfilePic} alt="Suna's profile picture" />
					</span>
					<div className="info">
						<h1>Suna</h1>
						<h2 style={{fontWeight: "normal"}}>Assassin / Predator</h2>
						<h2>KDA 18/0/0 | CS 250</h2>
					</div>
				</div>
				<div className="main-container">
					<div id="recent-matches" className="fancy-border">
						<div className="header">
							<h1>Recent Matches</h1>
							<div className="line"></div>
						</div>
						<table className="fancy-border">
							<tr>
								<th>Prey</th>
								<th>Result</th>
								<th>Time</th>
								<th>Clips</th>
							</tr>
							{ data.map((el, i) =>
								<tr>
									<td>{el.prey}</td>
									<td className={el.isVictory ? "victory" : "defeat"}>{el.isVictory ? "Victory" : "Defeat"}</td>
									<td>{el.clips} mins</td>
									<td>{([...Array(el.clips).keys()]).map((c, j) => <img onClick={() => showClip(i+1, j+1)} className="video" src={videoIcon} />)}</td>
								</tr>
							)}
						</table>
					</div>
					<div className="brief">
						<div id="stats" className="fancy-border">
							<h1>Champion Stats</h1>
							<div className="flex space-between">
								<p>Win Rate</p>
								<p style={{fontWeight: "bold"}}>85%</p>
							</div>
							<div className="flex space-between">
								<div>
									<h4>Favourite Prey</h4>
									<p style={{color: "#BD95C8"}}>Mice</p>
									<p style={{color: "#84602B"}}>Birds</p>
								</div>
								<div className="pie-chart"></div>
							</div>
							<div className="flex space-between">
								<p>Most Hunted Location</p>
								<p style={{fontWeight: "bold"}}>Basement</p>
							</div>
						</div>
						<div id="abilities" className="fancy-border">
							<h1>Abilities</h1>
							<p>Passive — Silent Stalker<br/>Increases stealth at night.</p>
							<p>Q — Pounce<br/>Suna jumps on her prey and marks 'em for death.</p>
							<p>W — Swipe Swipe<br/>A quick claw slash. Hurts more if you're weak. Don't bleed on the rug.</p>
							<p>E — Bat the Body<br/>Suna smacks a nearby corpse toward enemies. If it hits, they get slowed and mildly traumatized. Bonus style points if the body spins.</p>
							<p>R — Nine Lives<br/>Suna disappears into shadow. Then shows up behind you with claws out.</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}