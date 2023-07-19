import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import { useRouter } from 'next/router';
import React from 'react';

const EditProduct = () => {
	const router = useRouter();
	const { id } = router.query;

	console.log({ router });
	return (
		<Layout>
			<h1 className='header'>Edit Product</h1>
			<ProductForm />
		</Layout>
	);
};

export default EditProduct;
