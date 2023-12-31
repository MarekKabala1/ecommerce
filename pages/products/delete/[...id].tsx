import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Product } from '@/components/ProductForm';
import Spiner from '@/components/Spiner';

const DeleteProductPage = () => {
	const router = useRouter();
	const [productInfo, setProductInfo] = useState<Product>();
	const [imageUrl, setImageUrl] = useState<string>('');
	const [public_id, setPublic_Id] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const { id } = router.query;

	const goBack = () => {
		router.push('/products');
	};

	useEffect(() => {
		const fetchedProduct = async () => {
			setIsLoading(true);
			if (!id) {
				return;
			}

			try {
				const response = await fetch(`/api/product/edit-delete/${id}`, {
					method: 'GET',
				});

				if (response.ok) {
					const productData: Product = await response.json();
					const url = productData.imageUrl;
					const public_id = productData.public_id;
					setProductInfo(productData);
					setImageUrl(url?.toString() as string);
					setPublic_Id(public_id?.toString() as string);
					setIsLoading(false);
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

	const deleteImageFromCloudinary = async () => {
		if (!id && !public_id) {
			return;
		}
		try {
			const cloudinaryResponse = await fetch(`/api/product/deleteimage/${id}`, {
				method: 'POST',
				body: JSON.stringify(public_id),
				headers: { 'Content-Type': 'application/json' },
			});
			if (cloudinaryResponse.ok) {
				console.log('Image deleted from Cloudinary');
			} else {
				const errorMessage = await cloudinaryResponse.text();
				throw new Error(
					`Error deleting product image: ${cloudinaryResponse.status} - ${errorMessage}`
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const deleteProductFromPlanetScale = async () => {
		try {
			const response = await fetch(`/api/product/edit-delete/${id}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				await response.json();
				console.log(response.json());
			} else {
				const errorMessage = await response.text();
				throw new Error(
					`Error deleting product: ${response.status} - ${errorMessage}`
				);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const deleteProduct = async () => {
		deleteImageFromCloudinary();
		deleteProductFromPlanetScale();
		goBack();
	};

	return (
		<Layout>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<Spiner />
				</div>
			) : (
				<div className='border-2 border-gray-300 p-4 rounded-md'>
					<h1 className='text-center mb-4 '>
						Do you really want to delete &nbsp;
						<span className='font-bold'>
							&quot;
							{productInfo?.productName}
							&quot;
						</span>
						?
					</h1>
					<div className='flex gap-3 justify-center'>
						<button onClick={deleteProduct} className='btn-red'>
							Yes
						</button>
						<button className='btn-primary ' onClick={goBack}>
							NO
						</button>
					</div>
				</div>
			)}
		</Layout>
	);
};
export default DeleteProductPage;
