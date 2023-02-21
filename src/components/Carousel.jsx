import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../config/config";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
	const [credits, setCredits] = useState();

	const items = credits?.map((c) => (
		<div className="mx-2">
			<img
				src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
				alt={c?.name}
				onDragStart={handleDragStart}
				className='rounded-[10px]'
			/>
			<span className='font-extralight text-[8px] lg:text-xs'>{c?.name}</span>
		</div>
	));

	const responsive = {
		0: {
			items: 3,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 7,
		},
	};

	const fetchCredits = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		setCredits(data.cast);
	};

	useEffect(() => {
		fetchCredits();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AliceCarousel
			mouseTracking
			items={items}
			autoPlay
            infinite
			responsive={responsive}
			disableButtonsControls
			disableDotsControls
		/>
	);
};

export default Carousel;
