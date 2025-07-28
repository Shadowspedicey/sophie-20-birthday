import { useEffect, useRef, useState } from "react";

export default function Hand({canvasRef, historyRef, colour, isSuna, hidden}) {
	const [isDrawing, setIsDrawing] = useState(false);
	const maskDataRef = useRef(null);
	const imageLoadedRef = useRef(false);
	const scaleFactor = 1.75;
	const brushSize = 10;
	const lineCap = "round";

	const lastPointRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');
			ctx.lineWidth = brushSize;
			ctx.lineCap = lineCap;
			ctx.strokeStyle = colour;

			const img = new Image();
			img.src = isSuna ? "/suna-hand.png" : "/sophie-hand.png";
			img.onload = () => {
				canvas.width = img.naturalWidth/scaleFactor;
				canvas.height = img.naturalHeight/scaleFactor;

				canvas.style.width = `${img.naturalWidth/scaleFactor}px`;
				canvas.style.height = `${img.naturalHeight/scaleFactor}px`;

				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				maskDataRef.current = imageData;
				imageLoadedRef.current = true;
			};
		}
	}, [canvasRef]);

	const getCanvasCoords = (nativeEvent) => {
		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		return {
			x: (nativeEvent.clientX - rect.left) * scaleX,
			y: (nativeEvent.clientY - rect.top) * scaleY
		};
	};

	const isWhitePixel = (x, y) => {
		const { width, data } = maskDataRef.current;
		const index = (Math.floor(y) * width + Math.floor(x)) * 4;
		const r = data[index];
		const g = data[index + 1];
		const b = data[index + 2];

		return r > 250 && g > 250 && b > 250;
	};

	const startDrawing = ({ nativeEvent }) => {
		if (!imageLoadedRef.current) return;
		const { x, y } = getCanvasCoords(nativeEvent);
		const ctx = canvasRef.current.getContext("2d");

		if (isWhitePixel(x, y)) {
			const snapshot = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
			historyRef.current.push(snapshot);

			ctx.beginPath();
			ctx.lineWidth = brushSize;
			ctx.lineCap = lineCap;
			ctx.strokeStyle = colour;
			ctx.moveTo(x, y);
			ctx.lineTo(x, y);
			ctx.stroke();
			setIsDrawing(true);
			lastPointRef.current = { x, y };
		}
	};

	const draw = ({ nativeEvent }) => {
		if (!isDrawing) return;

		const { x, y } = getCanvasCoords(nativeEvent);
		const ctx = canvasRef.current.getContext("2d");
		const last = lastPointRef.current;
		if (!last) return;

		const dx = x - last.x;
		const dy = y - last.y;
		const distance = Math.hypot(dx, dy);
		const steps = Math.ceil(distance / 1.5); // Can tweak this

		let prevX = last.x;
		let prevY = last.y;

		for (let i = 1; i <= steps; i++) {
			const interpX = last.x + (dx * i) / steps;
			const interpY = last.y + (dy * i) / steps;

			// Only draw if both ends are white
			if (isWhitePixel(prevX, prevY) && isWhitePixel(interpX, interpY)) {
				ctx.beginPath();
				ctx.moveTo(prevX, prevY);
				ctx.lineTo(interpX, interpY);
				ctx.stroke();
			}

			prevX = interpX;
			prevY = interpY;
		}

		lastPointRef.current = { x, y };
	};

	const stopDrawing = () => {
		setIsDrawing(false);
		lastPointRef.current = null;
	};

	return (
		<canvas
			ref={canvasRef}
			onMouseDown={startDrawing}
			onMouseMove={draw}
			onMouseUp={stopDrawing}
			style={hidden ? {display: "none"} : {}}
		/>
	);
}