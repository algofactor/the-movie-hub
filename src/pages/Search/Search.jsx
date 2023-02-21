import { Tab, Tabs, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/CustomPagination";
import SingleContent from "../../components/SingleContent";

const Search = () => {
	const [type, setType] = useState(0);
	const [page, setPage] = useState(1);
	const [searchText, setSearchText] = useState("");
	const [content, setContent] = useState();
	const [numOfPages, setNumOfPages] = useState();

	const fetchSearch = async () => {
		try {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
					process.env.REACT_APP_API_KEY
				}&page=${page}&query=${searchText}&language=en-US&include_adult=false`
			);
			setContent(data.results);
			setNumOfPages(data.total_pages);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchSearch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, type, searchText]);

	return (
		<div>
			<span className='uppercase flex justify-center p-1 text-white font-extralight text-[1.1rem] md:text-[1.5rem] lg:text-[1.8rem] mb-4'>
				Find a movie or tv series
			</span>
			<div className='flex gap-3'>
				<TextField
					sx={{
						flex: 1,
					}}
					label='Search'
					variant='filled'
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</div>
			<Tabs
				value={type}
				indicatorColor='primary'
				textColor='primary'
				sx={{ display: "flex", width: "100%", fontSize: '10px' }}
				className="text-xs"
				onChange={(event, newValue) => {
					setType(newValue);
					setPage(1);
				}}>
				<Tab label='Search Movies' sx={{ flex: 1, fontSize: '10px' }} />
				<Tab label='Search TV Series' sx={{ flex: 1, fontSize: '10px' }} />
			</Tabs>

			<div className='flex flex-wrap justify-center gap-4'>
				{content &&
					content.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={type ? "tv" : "movie"}
							vote_average={c.vote_average}
						/>
					))}
				{searchText &&
					content.length < 1 &&
					(type ? (
						<h2 className='text-white mt-8'>No Series Found</h2>
					) : (
						<h2 className='text-white mt-8'>No Movies Found</h2>
					))}
			</div>
			{numOfPages > 1 && (
				<CustomPagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
	);
};

export default Search;
