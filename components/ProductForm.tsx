import React, { SyntheticEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Spiner from '@/components/Spiner';

export interface productData {
	category?: string;
	id?: string;
	productName?: string;
	description?: string;
	price?: number;
	imageUrl?: string;
	image?: string;
	public_id?: string;
	quantity?: number;
}

const ProductForm: React.FC<productData> = ({
	id: existingId,
	category: existingCategory,
	productName: existingProductName,
	description: existingDescription,
	price: existingPrice,
	imageUrl: existingImageUrl,
	image: existingImage,
	public_id: existingpublic_id,
	quantity: existingQuantity,
}) => {
	const [category, setCategory] = useState(existingCategory || '');
	const [productName, setProductName] = useState(existingProductName || '');
	const [description, setDescription] = useState(existingDescription || '');
	const [price, setPrice] = useState<number>(existingPrice || 0);
	const [imageUrl, setImageUrl] = useState(existingImageUrl || '');
	const [id, setId] = useState(existingId || '');
	const [image, setImage] = useState(existingImage || '');
	const [imageState, setImageState] = useState('');
	const [public_id, setPublic_id] = useState(existingpublic_id || '');
	const [quantity, setQuantity] = useState<number>(existingQuantity || 0);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const categories = [
		'---Choose a category---',
		'Proteins',
		'Testosterone & Performance Boosters',
		'Immunity',
		'Concentration, Memory & Energy',
		'Healthy Food',
		'Creatine',
		'Amino Acids',
		'Heart & Circulatory System',
		'Weight & Mass Gainers',
		'Endurance',
		'Keto Products',
		'Vitamins & Minerals',
		'Regeneration Formulas',
		'Fat Burners & Weight Loss',
		'Nightly Regeneration',
		'Accessories',
	];

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

	const SubmitProduct = async (e: SyntheticEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const productData: productData = {
			id,
			productName,
			description,
			imageUrl,
			category,
			price: !isNaN(price) ? price : 0,
			public_id,
			quantity: !isNaN(quantity) ? quantity : 0,
		};
		try {
			if (id) {
				const productResponse = await fetch(`/api/product/edit-delete/${id}`, {
					method: 'PUT',
					body: JSON.stringify({ ...productData, id }),
					headers: { 'Content-Type': 'application/json' },
				});
				if (productResponse.ok) {
					const data = await productResponse.json();
				}
			} else {
				const response = await fetch('/api/upload/image', {
					method: 'POST',
					body: JSON.stringify({ data: image }),
					headers: { 'Content-Type': 'application/json' },
				});
				if (response.ok) {
					const data = await response.json();

					const imgUrl = data.imageUrl;
					const public_id = data.public_id;
					let fullId = data.cludinary_id;
					let id = fullId.slice(14);
					productData.imageUrl = imgUrl as string;
					productData.id = id;
					productData.public_id = public_id;

					setImageUrl(imgUrl as string);
					setPublic_id(public_id as string);
					setId(id);

					const productResponse = await fetch('/api/upload/product', {
						method: 'POST',
						body: JSON.stringify({ data: productData }),
						headers: { 'Content-Type': 'application/json' },
					});
					if (productResponse.ok) {
						await productResponse.json();
					}
				}
			}
		} catch (err) {
			console.error(err);
		} finally {
			setId('');
			setDescription('');
			setPrice(0);
			setProductName('');
			setCategory('---Choose a category---');
			setImage('');
			setIsLoading(false);

			router.push('/products');
		}
	};
	return (
		<>
			{isLoading ? (
				<Spiner />
			) : (
				<form
					onSubmit={SubmitProduct}
					className='max-w-lg mx-auto border-t p-3 border-gray-200  '>
					<label htmlFor='category'>
						<b>Categories:</b>
						<select
							className='text-center'
							name='category'
							id='category'
							value={category}
							required
							onChange={(e) => setCategory(e.target.value)}>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</label>
					<label htmlFor='product'>
						<b>Product Name:</b>
						<input
							type='text'
							placeholder='Product Name'
							id='product'
							name='product'
							required
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
						/>
					</label>
					<label htmlFor='description'>
						<b>Description:</b>
						<textarea
							placeholder='Description'
							id='description'
							name='description'
							required
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</label>
					<div className='flex justify-between items-center'>
						<label htmlFor='price' className='w-20'>
							<b>Price in £</b>
							<input
								type='number'
								placeholder='Price'
								id='price'
								name='price'
								required
								step={0.1}
								value={price.toString()}
								onChange={(e) => setPrice(parseFloat(e.target.value))}
							/>
						</label>
						<label htmlFor='quantity' className='w-20'>
							<b>Quantity</b>
							<input
								type='number'
								placeholder='Quantity'
								id='quantity'
								name='quantity'
								value={quantity.toString()}
								onChange={(e) => setQuantity(parseInt(e.target.value))}
							/>
						</label>
					</div>
					<div className='flex justify-between mt-2'>
						<label className='btn-primary max-w-fit px-4 cursor-pointer text-center flex  items-center justify-center text-xs gap-1 '>
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
						</label>
						<button className='btn-primary text-xs p-4'>
							{id ? 'Update Product' : 'Add Product'}
						</button>
					</div>
					<div className=' h-32 w-32 mt-2 relative text-center'>
						{image ? (
							<Image
								src={image}
								fill
								alt='Product Image'
								unoptimized={true}
								loading='lazy'
								quality={75}
							/>
						) : (
							<p>No Image</p>
						)}
					</div>
				</form>
			)}
		</>
	);
};

export default ProductForm;
