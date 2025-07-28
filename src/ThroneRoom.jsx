import { useRef, useEffect } from 'react';
import sunaThroneNoEyes from "./assets/suna-throne-transparent.png";
import sunaThroneLeftEye from "./assets/suna-throne-left-eye.png";
import sunaThroneRightEye from "./assets/suna-throne-right-eye.png";

function ThroneRoom() {
	const leftEyeRef = useRef(null);
  	const rightEyeRef = useRef(null);

	useEffect(() => {
		const handleMouseMove = (e) => {
		[leftEyeRef, rightEyeRef].forEach((eyeRef) => {
			const eye = eyeRef.current;
			const rect = eye.getBoundingClientRect();
			const eyeX = rect.left + rect.width / 2;
			const eyeY = rect.top + rect.height / 2;

			const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
			const maxOffset = rect.width * 0.6; // how far the pupil can move

			const x = Math.cos(angle) * maxOffset;
			const y = Math.sin(angle) * maxOffset;

			eye.style.transform = `translate(${x}px, ${y}px)`;
		});
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return(
			<div className="cat-container">
				<img src={sunaThroneNoEyes} alt="" />
				<img className='left-eye eye' src={sunaThroneLeftEye} alt="" ref={leftEyeRef} />
				<img className='right-eye eye' src={sunaThroneRightEye} alt="" ref={rightEyeRef} />
			</div>
	);
}

export default ThroneRoom;