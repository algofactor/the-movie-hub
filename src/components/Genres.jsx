import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
	selectedGenres,
	setSelectedGenres,
	genres,
	setGenres,
	setPage,
	type,
}) => {
    
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };
   
    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
        setGenres([...genres, genre]);
        setPage(1);
    };

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
            );
            
            setGenres(data.genres);
        };
        
        useEffect(() => {
            fetchGenres();
            
            return () => {
                setGenres([]);
            };
            
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        

	return (
		<div className='py-2 flex flex-wrap gap-2 mb-4'>
			{selectedGenres &&
				selectedGenres.map((genre) => (
					<Chip
						sx={{
							cursor: "pointer",
						}}
						key={genre.id}
						clickable
						size='small'
                        color="primary"
						label={genre.name}
                        onDelete={() => handleRemove(genre)}
					/>
				))}
			{genres &&
				genres.map((genre) => (
					<Chip
						sx={{
							cursor: "pointer",
						}}
						key={genre.id}
						clickable
						size='small'
						label={genre.name}
						onClick={() => handleAdd(genre)}
						
					/>
				))}
		</div>
	);
};

export default Genres;
