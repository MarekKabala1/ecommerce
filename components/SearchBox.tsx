import React, { useState, useEffect } from 'react';
import { fetchedProduct } from '@/pages/api/product/getProducts';
import { brandTypes } from './BrandForm';

interface SearchBoxProps {
	onFilterChange: (filteredData: fetchedProduct[]) => void;
	products: fetchedProduct[];
}

const SearchBox: React.FC<SearchBoxProps> = ({ onFilterChange, products }) => {
	const [storedValue, setStoredValue] = useState('');

	useEffect(() => {
		const filteredData = products.filter((item) => {
			return item.productName.toLowerCase().includes(storedValue);
		});

		onFilterChange(filteredData);
	}, [storedValue, products]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		setStoredValue(value);
	};

	return (
		<>
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
		</>
	);
};

export default SearchBox;
