function Slide({ img, caption }) {
	return(
		<div className="slide">
			<img src={`/gallery/${img}`} alt={caption} />
			<p className="caption">{caption}</p>
		</div>
	);
}

export default Slide;