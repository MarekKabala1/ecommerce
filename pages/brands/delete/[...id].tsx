import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Spiner from '@/components/Spiner';
import { brandTypes } from '@/components/BrandForm';

const DeleteBrand = () => {
	const router = useRouter();
	const [brandInfo, setBrandInfo] = useState<brandTypes>();
	const [imageUrl, setImageUrl] = useState<string>('');
	const [public_id, setPublic_Id] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const { id } = router.query;

	const goBack = () => {
		router.push('/brands');
	};

	useEffect(() => {
		const fetchedBrand = async () => {
			setIsLoading(true);
			if (!id) {
				return;
			}

			try {
				const response = await fetch(`/api/brands/edit-delete/${id}`, {
					method: 'GET',
				});

				if (response.ok) {
					const brandData: brandTypes = await response.json();
					const public_id = brandData.public_id;
					setBrandInfo(brandData);
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

		fetchedBrand();
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

	const deleteBrandFromPlanetScale = async () => {
		try {
			const response = await fetch(`/api/brands/edit-delete/${id}`, {
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

	const deleteBrand = async () => {
		deleteImageFromCloudinary();
		deleteBrandFromPlanetScale();
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
							{brandInfo?.brandName}
							&quot;
						</span>
						?
					</h1>
					<div className='flex gap-3 justify-center'>
						<button onClick={deleteBrand} className='btn-red'>
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
export default DeleteBrand;
