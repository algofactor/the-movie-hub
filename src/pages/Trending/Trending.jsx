import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/CustomPagination";
import SingleContent from "../../components/SingleContent";

const Trending = () => {
	const [content, setContent] = useState([]);
	const [page, setPage] = useState(1);
	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
		);

		setContent(data.results);
	};

	useEffect(() => {
		fetchTrending();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<div>
			<span className='uppercase flex justify-center p-1 text-white font-extralight text-[1.1rem] md:text-[1.5rem] lg:text-[1.8rem] mb-4'>
				Trending Today
			</span>
			<div className='flex flex-wrap justify-center gap-4'>
				{content &&
					content.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={c.media_type}
							vote_average={c.vote_average}
						/>
					))}
			</div>
			<CustomPagination setPage={setPage} />
		</div>
	);
};

export default Trending;
