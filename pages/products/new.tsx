import Layout from '@/components/Layout';
import React, { SyntheticEvent, useState } from 'react';

const NewProduct = () => {
	const [productName, setProductName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');

	function addProduct(e: SyntheticEvent) {
		e.preventDefault();
		const data = { productName, price, description };
		console.log(data);

		setDescription('');
		setPrice('');
		setProductName('');
	}
	return (
		<Layout>
			<form onSubmit={addProduct}>
				<h2>New Product</h2>
				<label htmlFor='product'>
					<b>Product Name</b>
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
					<b>Description</b>
				</label>
				<textarea
					placeholder='Description'
					id='description'
					name='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<label htmlFor='price'>
					<b>Price in (GB)</b>
				</label>
				<input
					type='number'
					placeholder='Price'
					id='price'
					name='price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<button className='btn-primary text-xs' type='submit'>
					Save Product
				</button>
			</form>
		</Layout>
	);
};

export default NewProduct;
