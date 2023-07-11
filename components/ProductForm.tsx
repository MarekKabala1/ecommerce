import axios from 'axios';
import Image from 'next/image';
import React, { SyntheticEvent, useState } from 'react';
// import { uploadImages } from '@/pages/api/cloudinaryUpload';

const ProductForm = () => {
	const [productName, setProductName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('---Choose a category---');
	const [image, setImage] = useState('');
	const [imageState, setImageState] = useState('');

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
		// const data = { productName, price, description, category, image };
		// // console.log(data);
		// setDescription('');
		// setPrice('');
		// setProductName('');
		// setCategory('---Choose a category---');
		try {
			await fetch('/api/upload', {
				method: 'POST',
				body: JSON.stringify({ data: image }),
				headers: { 'Content-Type': 'application/json' },
			});
			setImage('');
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<form onSubmit={SubmitProduct}>
			<h2>New Product</h2>
			<label htmlFor='category'>
				<b>Categories:</b>
			</label>
			<select
				name='category'
				id='category'
				className='text-center'
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
				value={price}
				onChange={(e) => setPrice(e.target.value)}
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
