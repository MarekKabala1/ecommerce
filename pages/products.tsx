import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';

const Products = () => {
	return (
		<Layout>
			<div className='text-center'>
				<Link
					className='bg-gray-300 text-blue-700 w-full text-s rounded-md border border-gray-400 p-1 px-2'
					href={'/products/new'}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-4 h-4 inline mr-2 mb-1'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 4.5v15m7.5-7.5h-15'
						/>
					</svg>
					Add new product
				</Link>
			</div>
		</Layout>
	);
};

export default Products;
