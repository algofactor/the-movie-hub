import { Badge } from "@mui/material";
import React from "react";
import { img_300, unavailable } from "../config/config";
import ContentModal from "./ContentModal";

const SingleContent = ({
	id,
	poster,
	title,
	date,
	media_type,
	vote_average,
}) => {
	const rating = vote_average.toFixed(2);
	return (
		<ContentModal media_type={media_type} id={id}>
			<div className='cursor-pointer flex flex-col w-[200px] p-1 my-1 bg-[#21242a] text-white rounded-[10px] relative transition-all duration-500 hover:bg-[#000]'>
				<Badge
					badgeContent={rating}
					sx={{ justifyContent: "end" }}
					color={rating > 6 ? "primary" : "secondary"}></Badge>
				<img
					className='rounded-[10px]'
					src={poster ? `${img_300}/${poster}` : unavailable}
					alt={title}
				/>
				<span className='w-full text-center text-sm py-2 font-extralight'>{title}</span>
				<div className='flex justify-between text-xs p-2 font-extralight'>
					<span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
					<span>{date}</span>
				</div>
			</div>
		</ContentModal>
	);
};

export default SingleContent;
