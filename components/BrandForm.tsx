import Image from 'next/image';
import React, { SyntheticEvent, useState } from 'react';
import Spiner from './Spiner';
import { useRouter } from 'next/router';
import { makeApiRequest } from '@/utils/apiRequests';

export interface brandTypes {
	id?: string;
	brandName?: string;
	public_id?: string | null;
	image?: string;
	products?: [];
}

const BrandForm: React.FC<brandTypes> = ({
	brandName: existingBrandName,
	id: existingBrandId,
	image: existingImage,
	public_id: existingPublic_id,
	products: existingProducts,
}) => {
	const [brandName, setBrandName] = useState(existingBrandName || '');
	const [id, setId] = useState<string>(existingBrandId || '');
	const [image, setImage] = useState(existingImage || '');
	const [imageState, setImageState] = useState('');
	const [public_id, setPublic_id] = useState(existingPublic_id || '');
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target || !e.target.files || e.target.files.length === 0) {
			return;
		}
		const file = e.target?.files[0];
		previewFile(file);
		setImageState(e.target.value);
	};

	const previewFile = (file: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			if (reader.result && typeof reader.result === 'string') {
				setImage(reader.result);
			}
		};
	};

	const addBrand = async (e: SyntheticEvent) => {
		e.preventDefault();
		setIsLoading(true);
		const brandData: brandTypes = {
			id,
			brandName,
			public_id,
		};
		try {
			if (id) {
				const updateBrand = await makeApiRequest(
					`/api/brands/edit-delete/${id}`,
					'PUT',
					{
						...brandData,
						id,
					}
				);
			} else {
				const addImageToCloudinary = await makeApiRequest(
					'/api/upload/image',
					'POST',
					{
						data: image,
					}
				);
				const public_id = addImageToCloudinary.public_id;
				brandData.public_id = public_id;
				setPublic_id(public_id as string);

				brandData.id = self.crypto.randomUUID();
				const brandId = brandData?.id;
				setId(brandId);

				const addNewBrand = await makeApiRequest('/api/upload/brand', 'POST', {
					data: brandData,
				});
			}
		} catch (err) {
			console.error(err);
		} finally {
			setId('');
			setBrandName('');
			setPublic_id('');
			setImage('');
			setImageState('');
			setIsLoading(false);

			if (!id) {
				router.reload();
			} else {
				router.push('/brands');
			}
		}
	};

	return (
		<>
			{isLoading ? (
				<Spiner />
			) : (
				<>
					<h1 className='header text-center mb-4'>
						{id ? 'Edit Brand' : 'Add Brand'}
					</h1>
					<form
						className='flex flex-col  justify-center gap-3 mb-8'
						onSubmit={addBrand}>
						<div className='flex items-center justify-center gap-3'>
							<input
								type='text'
								placeholder='Brand Name'
								className='max-w-xs block  text-center'
								id='brand'
								name='brand'
								required
								value={brandName}
								onChange={(e) => setBrandName(e.target.value)}
							/>
							<label
								className={
									image
										? ' max-w-fit px-4 cursor-pointer text-center flex  items-center justify-center text-xs gap-1'
										: 'btn-primary max-w-fit px-4 cursor-pointer text-center flex  items-center justify-center text-xs gap-1 '
								}>
								{image ? (
									<Image
										src={image}
										alt='Brand Image'
										unoptimized={true}
										loading='lazy'
										quality={75}
										width={120}
										height={120}
										className='h-auto'
									/>
								) : (
									<>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
											/>
										</svg>
										<p>Add image</p>
										<input
											className='hidden'
											type='file'
											onChange={handleImageInput}
										/>
									</>
								)}
							</label>
						</div>
						<button type='submit' className='btn-primary w-fit mx-auto'>
							{id ? 'Update Brand' : 'Add Brand'}
						</button>
					</form>
				</>
			)}
		</>
	);
};

export default BrandForm;
