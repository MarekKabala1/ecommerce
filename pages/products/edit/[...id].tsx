import Layout from '@/components/Layout';
import ProductForm, { productData } from '@/components/ProductForm';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
const EditProduct = () => {
	const [productToEdit, setProductToEdit] = useState<productData>();
	const router = useRouter();

	const { id } = router.query;

	const fetchedProduct = async () => {
		if (!id) {
			return;
		}

		try {
			const response = await fetch(`/api/products/${id}`, {
				method: 'GET',
			});

			if (response.ok) {
				const productData: productData = await response.json();
				setProductToEdit(productData);
				console.log(productToEdit);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchedProduct();
	}, []);

	return (
		<Layout>
			<h1 className='header'>Edit Product</h1>
			{productToEdit && <ProductForm {...productToEdit} />}
		</Layout>
	);
};

export default EditProduct;
