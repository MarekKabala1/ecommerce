import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useState } from 'react';

export interface productData {
	id?: string;
	productName?: string;
	description?: string;
	imageUrl?: string;
	category?: string;
	price?: number;
}

const ProductForm = () => {
	const [id, setId] = useState('');
	const [productName, setProductName] = useState('');
	const [price, setPrice] = useState<number>(0);
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('---Choose a category---');
	const [imageUrl, setImageUrl] = useState('');
	const [image, setImage] = useState('');
	const [imageState, setImageState] = useState('');

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
		const productData: productData = {
			id,
			productName,
			description,
			imageUrl,
			category,
			price,
		};
		try {
			const response = await fetch('/api/upload/image', {
				method: 'POST',
				body: JSON.stringify({ data: image }),
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.ok) {
				const data = await response.json();

				const imgUrl = data.imageUrl;
				let fullId = data.cludinary_id;
				let id = fullId.slice(14);
				setId(id);

				setImageUrl(imgUrl as string);
				productData.imageUrl = imgUrl as string;
				productData.id = id;

				const productResponse = await fetch('/api/upload/product', {
					method: 'POST',
					body: JSON.stringify({ data: productData }),
					headers: { 'Content-Type': 'application/json' },
				});
				if (productResponse.ok) {
					const data = await productResponse.json();
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

			router.push('/products');
		}
	};
	return (
		<form onSubmit={SubmitProduct}>
			<h2>New Product</h2>
			<label htmlFor='category'>
				<b>Categories:</b>
			</label>
			<select
				className='text-center'
				name='category'
				id='category'
				required
				onChange={(e) => setCategory(e.target.value)}>
				{categories.map((category) => (
					<option key={category} value={category}>
						{category}
					</option>
				))}
			</select>
			<label htmlFor='product'>
				<b>Product Name:</b>
			</label>
			<input
				type='text'
				placeholder='Product Name'
				id='product'
				name='product'
				required
				value={productName}
				onChange={(e) => setProductName(e.target.value)}
			/>
			<label htmlFor='description'>
				<b>Description:</b>
			</label>
			<textarea
				placeholder='Description'
				id='description'
				name='description'
				required
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			<label htmlFor='price'>
				<b>Price in £ (GB):</b>
			</label>
			<input
				type='number'
				placeholder='Price'
				id='price'
				name='price'
				required
				step={0.1}
				value={price}
				onChange={(e) => setPrice(parseInt(e.target.value))}
			/>
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
						required
						value={imageState}
						onChange={handleImageInput}
					/>
				</label>
				<button className='btn-primary text-xs p-4'>Add Product</button>
			</div>
			<div className='h-52 w-52 mt-2'>
				{image ? (
					<Image src={image} width={150} height={150} alt={''} />
				) : (
					<p>Image not Uploaded yet</p>
				)}
			</div>
		</form>
	);
};

export default ProductForm;
