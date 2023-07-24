import Layout from '@/components/Layout';
import ProductForm, { productData } from '@/components/ProductForm';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const EditProduct = () => {
	const [productToEdit, setProductToEdit] = useState<productData>();
	const [imageUrl, setImageUrl] = useState<string>('');
	const router = useRouter();

	const { id } = router.query;

	const fetchedProduct = async () => {
		if (!id) {
			return;
		}

		try {
			const response = await fetch(`/api/product/${id}`, {
				method: 'GET',
			});

			if (response.ok) {
				const productData: productData = await response.json();
				setProductToEdit(productData);
				const url = productData.imageUrl;
				// const url = urlToModify?.replace(
				// 	'https://res.cloudinary.com/df6nyjwz2/image/upload',
				// 	''
				// );
				setImageUrl(url?.toString() as string);
				return url;
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchedProduct();
	}, [id]);

	return (
		<Layout>
			<h1 className='header'>Edit Product</h1>
			{productToEdit && <ProductForm {...productToEdit} image={imageUrl} />}
		</Layout>
	);
};

export default EditProduct;
