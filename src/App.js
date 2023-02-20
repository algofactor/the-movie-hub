import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import MainNav from "./components/MainNav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Movies from "./pages/Movies/Movies";
import Trending from "./pages/Trending/Trending";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";

function App() {
	const theme = createTheme({
		typography: {
			fontFamily: ["Montserrat", "sans-serif"].join(","),
		},
    palette: {
      mode: "dark",
    },
	});
	return (
		<>
			<Router>
				<ThemeProvider theme={theme}>
					<Header />
					<div className='min-h-[100vh] bg-[#181c27] text-white pt-[50px] md:pt-[60px] lg:pt-[90px] pb-[70px]'>
						<Container>
							<Routes>
								<Route path='/' element={<Trending />} />
								<Route path='/movies' element={<Movies />} />
								<Route path='/series' element={<Series />} />
								<Route path='/search' element={<Search />} />
							</Routes>
						</Container>
					</div>
					<MainNav />
				</ThemeProvider>
			</Router>
		</>
	);
}

export default App;
