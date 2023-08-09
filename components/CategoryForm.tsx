import React, { SyntheticEvent, useState } from 'react';

export interface categoryTypes {
	id: string;
	categoryName: string;
}

const CategoryForm: React.FC<categoryTypes> = ({
	id: existingCategoryId,
	categoryName: existingCanegoryName,
}) => {
	const [categoryName, setCategoryName] = useState(existingCanegoryName || '');
	const [id, setId] = useState<string>(existingCategoryId || '');
	const [categoryArray, setCategoryArray] = useState<Array<categoryTypes>>([]);

	const addCategory = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log('click');

		const categoryData: categoryTypes = {
			id,
			categoryName,
		};
		try {
			categoryData.id = self.crypto.randomUUID();

			setCategoryArray((_categoryData) => [...categoryArray]);
			console.log(categoryData);
		} catch (err) {}
	};

	return (
		<>
			<h1 className='heade text-center mb-4'>Category Page</h1>
			<form
				className='flex flex-col items-center justify-center'
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
					Add Category
				</button>
			</form>
		</>
	);
};

export default CategoryForm;
