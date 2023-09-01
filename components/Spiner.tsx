import React from 'react';
import ClockLoader from 'react-spinners/ClockLoader';

const Spiner = () => {
	return (
		<>
			<div className='w-full h-full flex justify-center items-center'>
				<ClockLoader
					size={100}
					loading={true}
					speedMultiplier={0.5}
					color='#1e40af'
				/>
			</div>
		</>
	);
};

export default Spiner;
