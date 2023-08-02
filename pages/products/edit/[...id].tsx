import Layout from '@/components/Layout';
import ProductForm, { productData } from '@/components/ProductForm';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const EditProduct = () => {
	const [productToEdit, setProductToEdit] = useState<productData>();
	const [imageUrl, setImageUrl] = useState<string>('');
	const router = useRouter();

	const { id } = router.query;

	useEffect(() => {
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
					const url = productData.imageUrl;
					console.log(url);
					setProductToEdit(productData);
					setImageUrl(url?.toString() as string);
					return url;
				} else {
					const errorMessage = await response.text();
					throw new Error(
						`Error fetching product data: ${response.status} - ${errorMessage}`
					);
				}
			} catch (err) {
				console.error(err);
				throw new Error('Error fetching product data');
			}
		};

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
