export default function VideoPlayer({ killN, clipN, hideVideoPlayer}) {
	return(
		<div id="video-player" onClick={hideVideoPlayer}>
			<img onClick={e => e.stopPropagation()} src={`/league-profile/kill-${killN}-${clipN}.gif`} />
		</div>
	);
}