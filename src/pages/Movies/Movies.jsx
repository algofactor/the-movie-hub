import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/CustomPagination";
import Genres from "../../components/Genres";
import SingleContent from "../../components/SingleContent";

const Movies = () => {
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [genres, setGenres] = useState([]);

	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
		);

		setContent(data.results);
		setNumOfPages(data.total_pages);
	};

	useEffect(() => {
		fetchMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<div>
			<span className='uppercase flex justify-center p-1 text-white font-extralight text-[1.5rem] md:text-[1.8rem] lg:text-[2.5rem]'>
				Movies
			</span>
			<Genres
				type='movie'
				selectedGenres={selectedGenres}
				setSelectedGenres={setSelectedGenres}
				genres={genres}
				setGenres={setGenres}
                setPage={setPage}
			/>
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
			{numOfPages > 1 && (
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
	);
};

export default Movies;
