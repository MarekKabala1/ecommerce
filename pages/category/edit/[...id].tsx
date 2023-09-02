import CategoryForm, { categoryTypes } from '@/components/CategoryForm';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const EditBrand = () => {
	const [categoryToEdit, setCategoryToEdit] = useState<categoryTypes>();

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		const fetchedCategory = async () => {
			if (!id) {
				return;
			}

			try {
				const response = await fetch(`/api/categorys/edit-delete/${id}`, {
					method: 'GET',
				});

				if (response.ok) {
					const categoryData: categoryTypes = await response.json();

					setCategoryToEdit(categoryData);
				} else {
					const errorMessage = await response.text();
					throw new Error(
						`Error fetching category data: ${response.status} - ${errorMessage}`
					);
				}
			} catch (err) {
				console.error(err);
				throw new Error('Error fetching category data');
			}
		};

		fetchedCategory();
	}, [id]);

	return (
		<Layout>{categoryToEdit && <CategoryForm {...categoryToEdit} />}</Layout>
	);
};

export default EditBrand;
