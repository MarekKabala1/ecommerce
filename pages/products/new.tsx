import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';

const NewProduct = () => {
	const router = useRouter();

	const goBackToProductPage = () => {
		router.push('/products');
	};
	return (
		<Layout>
			<button
				onClick={goBackToProductPage}
				type='button'
				className='btn-secondary flex gap-1'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-4 h-4'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75'
					/>
				</svg>
				Go Back
			</button>
			<h1 className='header'>New Product</h1>
			<ProductForm />
		</Layout>
	);
};

export default NewProduct;
