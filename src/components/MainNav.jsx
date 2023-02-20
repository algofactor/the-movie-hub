import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Movie, Search, Tv, Whatshot } from "@mui/icons-material";

const MainNav = () => {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		if (value === 0) {
			navigate("/");
		} else if (value === 1) {
			navigate("/movies");
		} else if (value === 2) {
			navigate("/series");
		} else if (value === 3) {
			navigate("/search");
		}
	}, [value, navigate]);

	return (
		<BottomNavigation
			sx={{
				backgroundColor: "#11141c",
				position: "fixed",
				bottom: 0,
				zIndex: 100,
				width: "100%",
				fontFamily: "Montserrat",
			}}
			showLabels
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}>
			<BottomNavigationAction
				label='Trending'
				icon={<Whatshot />}
				sx={{ color: "white", fontSize: "10px" }}
			/>
			<BottomNavigationAction
				label='Movies'
				icon={<Movie />}
				sx={{ color: "white", fontSize: "10px" }}
			/>
			<BottomNavigationAction
				label='TV Series'
				icon={<Tv />}
				sx={{ color: "white", fontSize: "10px" }}
			/>
			<BottomNavigationAction
				label='Search'
				icon={<Search />}
				sx={{ color: "white", fontSize: "10px" }}
			/>
		</BottomNavigation>
	);
};

export default MainNav;
