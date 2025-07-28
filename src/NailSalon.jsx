import { useRef, useState } from "react";
import Hand from "./Hand";

function NailSalon() {
	const sophieHistoryRef = useRef([]);
	const sophieCanvasRef = useRef(null);
	const sunaHistoryRef = useRef([]);
	const sunaCanvasRef = useRef(null);

	const [colour, setColour] = useState("red");
	const colourPicker = useRef(null);
	const colours = ["#C41E3A", "#EAD6C7", "#F9F6F2", "#D8A7B1", "#B2AC88"]

	const [isSuna, setIsSuna] = useState(false);
	const undo = () => {
		const canvasRef = isSuna ? sunaCanvasRef : sophieCanvasRef;
		const historyRef = isSuna ? sunaHistoryRef : sophieHistoryRef;
		const ctx = canvasRef.current.getContext("2d");
		if (historyRef.current.length > 0) {
			const lastImage = historyRef.current.pop();
			ctx.putImageData(lastImage, 0, 0);
		}
	};

	return(
		<div id="nail-salon-container">
			<h1>Suna's Nail Salon</h1>
			<div id="nail-salon-game-container">
				<Hand historyRef={sunaHistoryRef} canvasRef={sunaCanvasRef} colour={colour} isSuna hidden={!isSuna}/>
				<Hand historyRef={sophieHistoryRef} canvasRef={sophieCanvasRef} colour={colour} hidden={isSuna}/>
				<div className="sidebar">
					<div id="colours-container">
						<h2>Colours</h2>
						<div className="colours">
							{colours.map(c => 
								<span style={{backgroundColor: c}} onClick={() => setColour(c)}></span>
							)}
							<span onClick={() => colourPicker.current.showPicker()} style={{background: "linear-gradient(-45deg, #ff0000 0%, #ff7f00 14%, #ffff00 28%, #00ff00 42%, #0000ff 57%, #4b0082 71%, #8f00ff 85%, #ff0000 100%)"}}><input onChange={e => setColour(e.target.value)} type="color" style={{opacity: 0, pointerEvents: "none"}} ref={colourPicker}/></span>
						</div>
					</div>
					<div className="buttons">
						<button onClick={undo}>Undo</button>
						<button onClick={() => setIsSuna(!isSuna)}>Show {isSuna ? "Sophie" : "Suna"}</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NailSalon;