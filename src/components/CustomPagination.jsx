import { Pagination } from "@mui/material";
import React from "react";

const CustomPagination = ({ setPage, numOfPages }) => {
	const handlePageChange = (page) => {
		setPage(page);
		window.scroll(0, 0);
	};

	return (
		<div className='flex justify-center py-4'>
			<Pagination
				sx={{
					color: "white",
				}}
				count={numOfPages ? numOfPages : 10}
				color='primary'
				onChange={(e) => handlePageChange(e.target.textContent)}
				hideNextButton
				hidePrevButton
			/>
		</div>
	);
};

export default CustomPagination;
