import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import data from "./gallery-data.json";
import paw from "./assets/paw.svg";
import Slide from "./Slide";
import { useRef } from "react";

function Gallery() {
	const audioRef = useRef(new Audio());
	const handleSlideChange = (swiper) => {
		const slideData = data[swiper.realIndex];
		audioRef.current.src = null;
		if (slideData.sound) {
			audioRef.current.src = `/sounds/${slideData.sound}`;
			audioRef.current.play();
		}
	};

	return(
		<div id="swiper-container">
			<img
			src={paw}
			className="swiper-button-prev custom-nav"
			alt="Prev"
			/>
			<img
			src={paw}
			className="swiper-button-next custom-nav"
			alt="Next"
			/>

			<Swiper
			modules={[Navigation, Pagination]}
			id="gallery-swiper"
			spaceBetween={50}
			slidesPerView={1}
			loop={true}
			navigation={{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}}
			pagination={{ clickable: true }}
			onSlideChange={handleSlideChange}>
				{ data.map((el, i) =>
					<SwiperSlide key={i}>
						<Slide img={el.img} caption={el.caption} />
					</SwiperSlide>
				)}
			</Swiper>
		</div>
	);
}

export default Gallery;