import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Spiner from '@/components/Spiner';
import { categoryTypes } from '@/components/CategoryForm';

const DeleteCategory = () => {
	const router = useRouter();
	const [categoryInfo, setCategoryInfo] = useState<categoryTypes>();
	const [isLoading, setIsLoading] = useState(false);
	const { id } = router.query;

	const goBack = () => {
		router.push('/categorys');
	};

	useEffect(() => {
		const fetchedCategory = async () => {
			setIsLoading(true);
			if (!id) {
				return;
			}

			try {
				const response = await fetch(`/api/categorys/edit-delete/${id}`, {
					method: 'GET',
				});

				if (response.ok) {
					const categoryData: categoryTypes = await response.json();

					setCategoryInfo(categoryData);
					setIsLoading(false);
				} else {
					const errorMessage = await response.text();
					throw new Error(
						`Error fetching category data: ${response.status} - ${errorMessage}`
					);
				}
			} catch (err) {
				console.error(err);
				throw new Error('Error fetching product data');
			}
		};

		fetchedCategory();
	}, [id]);

	const deleteCategoryFromPlanetScale = async () => {
		try {
			const response = await fetch(`/api/categorys/edit-delete/${id}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				await response.json();
				console.log(response.json());
			} else {
				const errorMessage = await response.text();
				throw new Error(
					`Error deleting category: ${response.status} - ${errorMessage}`
				);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const deleteCategory = async () => {
		deleteCategoryFromPlanetScale();
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
							{categoryInfo?.categoryName}
							&quot;
						</span>
						?
					</h1>
					<div className='flex gap-3 justify-center'>
						<button onClick={deleteCategory} className='btn-red'>
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
export default DeleteCategory;
