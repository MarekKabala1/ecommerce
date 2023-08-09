import React, { SyntheticEvent, useState } from 'react';

export interface brandTypes {
	id: string;
	brandName: string;
	imagePublicId?: string;
}

const BrandForm: React.FC<brandTypes> = ({
	brandName: existingBrandName,
	id: existingBrandId,
}) => {
	const [brandName, setBrandName] = useState(existingBrandName || '');
	const [id, setId] = useState<string>(existingBrandId || '');
	const [brandArray, setBrandArray] = useState<Array<brandTypes>>([]);

	const addBrand = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log('click');

		const categoryData: brandTypes = {
			id,
			brandName,
		};
		try {
			categoryData.id = self.crypto.randomUUID();

			setBrandArray((_brandData) => [...brandArray]);
			console.log(categoryData);
		} catch (err) {}
	};

	return (
		<>
			<h1 className='heade text-center mb-4'>Brand Page</h1>
			<form
				className='flex flex-col items-center justify-center'
				onSubmit={addBrand}>
				<input
					type='text'
					placeholder='Brand Name'
					className='max-w-sm block mb-4 text-center'
					id='brand'
					name='brand'
					required
					value={brandName}
					onChange={(e) => setBrandName(e.target.value)}
				/>
				<button type='submit' className='btn-primary'>
					Add Brand
				</button>
			</form>
		</>
	);
};

export default BrandForm;
