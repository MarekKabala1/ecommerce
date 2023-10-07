import Layout from '@/components/Layout';
import ProductForm, {
	Product,
	ProductFormProps,
} from '@/components/ProductForm';
import { makeApiRequest } from '@/utils/apiRequests';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const EditProduct = () => {
	const [productToEdit, setProductToEdit] = useState<Product>();
	const [imageUrl, setImageUrl] = useState<string>('');
	const router = useRouter();

	const { id } = router.query;

	const goBackToProductPage = () => {
		router.push('/products');
	};

	const fetchedProduct = async () => {
		if (!id) {
			return;
		}

		try {
			const response = await fetch(`/api/product/edit-delete/${id}`, {
				method: 'GET',
			});

			if (response.ok) {
				const productData = await response.json();
				const url = productData.imageUrl;
				if (productData === undefined) {
					return undefined;
				}
				setProductToEdit(productData);

				// console.log(productData);
				setImageUrl(url?.toString() as string);
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

	useEffect(() => {
		fetchedProduct();
		// console.log(productToEdit);
	}, [id]);

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
			<h1 className='header'>Edit Product</h1>
			{productToEdit && imageUrl && (
				<ProductForm existingProduct={productToEdit} image={imageUrl} />
			)}
		</Layout>
	);
};

export default EditProduct;
