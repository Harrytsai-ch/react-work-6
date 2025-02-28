import ClipLoader from "react-spinners/ClipLoader";
const PageSpinnerLoader = ({ isWindowLoading }) => {
	return (
		<>
			{isWindowLoading && (
				<div
					className='d-flex justify-content-center align-items-center'
					style={{
						position: "fixed",
						inset: 0,
						backgroundColor: "rgba(255,255,255,0.3)",
						zIndex: 999,
					}}>
					<ClipLoader color='black' size={50} />
				</div>
			)}
		</>
	);
};

export default PageSpinnerLoader;
