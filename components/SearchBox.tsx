import { fetchedProduct } from '@/pages/api/product/getProducts';
import { useState } from 'react';

export interface ProductFormProps {
	data?: fetchedProduct[];
}
//TODO:IMPLEMENT A SERCH BAR IN FREE TIME
const SearchBox: React.FC<ProductFormProps> = ({ data }) => {
	const [storedValue, setStoredValue] = useState('');
	const [productData, setProductData] = useState<fetchedProduct>();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		var valueToLowerCase = e.target.value.toLowerCase();
		setStoredValue(valueToLowerCase);
		console.log(storedValue);
	};
	return (
		<div>
			<label htmlFor='searchBox'>Search Product</label>
			<input
				type='text'
				name='searchBox'
				id='searchBox'
				value={storedValue}
				onChange={handleChange}
				placeholder='Tap to search Product'
			/>
		</div>
	);
};

export default SearchBox;
