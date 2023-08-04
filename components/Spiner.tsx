import React from 'react';
import ClockLoader from 'react-spinners/ClockLoader';

const Spiner = () => {
	return (
		<>
			<ClockLoader
				size={100}
				loading={true}
				speedMultiplier={0.5}
				color='#1e40af'
			/>
		</>
	);
};

export default Spiner;
