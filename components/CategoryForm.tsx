import { makeApiRequest } from '@/utils/apiRequests';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';

export interface categoryTypes {
	id?: string;
	categoryName?: string;
	products?: [];
}

const CategoryForm: React.FC<categoryTypes> = ({
	id: existingCategoryId,
	categoryName: existingCanegoryName,
	products: existingProducts,
}) => {
	const [categoryName, setCategoryName] = useState(existingCanegoryName || '');
	const [id, setId] = useState<string>(existingCategoryId || '');
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const addCategory = async (e: SyntheticEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (!categoryName) {
			throw new Error('Category Name is required.');
		}

		const categoryData: categoryTypes = {
			id,
			categoryName,
		};
		try {
			if (id) {
				const updatedCategory = await makeApiRequest(
					`/api/categorys/edit-delete/${id}`,
					'PUT',
					{ ...categoryData, id }
				);
			} else {
				categoryData.id = self.crypto.randomUUID();
				const id = categoryData?.id;
				setId(id as string);
				const createdCategory = await makeApiRequest(
					'/api/upload/category',
					'POST',
					{ data: categoryData }
				);
			}
		} catch (err: Error | any) {
			console.error('An error occurred:', err.message);
		} finally {
			setId('');
			setCategoryName('');
			setIsLoading(false);

			if (!id) {
				router.reload();
			} else {
				router.push('/categorys');
			}
		}
	};

	return (
		<>
			<h1 className='heade text-center mb-4'>Category Page</h1>
			<form
				className='flex flex-col items-center justify-center mb-8'
				onSubmit={addCategory}>
				<input
					type='text'
					placeholder='Category Name'
					className='max-w-sm block mb-4 text-center'
					id='category'
					name='category'
					required
					value={categoryName}
					onChange={(e) => setCategoryName(e.target.value)}
				/>
				<button type='submit' className='btn-primary'>
					{id ? 'Edit Category' : 'Add Category'}
				</button>
			</form>
		</>
	);
};

export default CategoryForm;
