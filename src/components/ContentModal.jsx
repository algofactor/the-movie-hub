import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import axios from "axios";
import { img_500, unavailable, unavailableLandscape } from "../config/config";
import { YouTube } from "@mui/icons-material";
import Carousel from "./Carousel";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90%",
	height: "80%",
	backgroundColor: "#181c27",
	color: "white",
	boxShadow: 24,
	borderRadius: "10px",
	overflowY: "scroll",
	p: 2,
};

const buttonSX = {
	backgroundColor: "transparent",
	color: "white",
	textTransform: "capitalize",
	"&:hover": {
		backgroundColor: "transparent",
	},
};

export default function ContentModal({ children, media_type, id }) {
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState();
	const [video, setVideo] = useState();
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		setContent(data);
	};

	const fetchVideo = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		setVideo(data.results[0]?.key);
	};

	useEffect(() => {
		fetchData();
		fetchVideo();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Button sx={buttonSX} onClick={handleOpen}>
				{children}
			</Button>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}>
				<Fade in={open}>
					<Box sx={style} className='contentContainer'>
						{content && (
							<div className='flex flex-col lg:flex-row gap-4'>
								<img
									src={
										content.poster_path
											? `${img_500}/${content.poster_path}`
											: unavailable
									}
									alt={content.name || content.title}
									className='hidden lg:flex flex-[1] rounded-[10px] mb-2'
								/>
								<img
									src={
										content.poster_path
											? `${img_500}/${content.backdrop_path}`
											: unavailableLandscape
									}
									alt={content.name || content.title}
									className='rounded-[10px] mb-2 flex flex-[1] lg:hidden'
								/>
								<div className='flex-[1]'>
									<div className='text-center font-extralight uppercase tracking-wider text-md lg:text-xl mb-2'>
										{content.name || content.title}(
										{(
											content.first_air_date ||
											content.release_date ||
											"......."
										).substring(0, 4)}
										)
									</div>
									<div className='flex justify-center'>
										{content.tagline && (
											<span className='text-[9px] lg:text-xs text-center font-extralight mb-4'>
												{content.tagline}
											</span>
										)}
									</div>
									<div className='py-2 px-4 border border-white rounded-[10px] text-xs lg:text-sm font-extralight leading-7 mb-6 h-[150px] overflow-y-scroll contentDesc'>
										{content.overview ? content.overview : 'Not available.....'}
									</div>
									<div className="max-w-[700px] mb-6 mx-auto">
                                        <Carousel media_type={media_type} id={id} />
                                    </div>
									<div className='flex justify-center'>
										<Button
											variant='contained'
											startIcon={<YouTube />}
											color='error'
											target='_blank'
											sx={{
												fontWeight: "300",
											}}
											href={`https://www.youtube.com/watch?v=${video}`}>
											Watch the Trailer
										</Button>
									</div>
								</div>
							</div>
						)}
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
