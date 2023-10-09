import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Spiner from '@/components/Spiner';
import DisplayProducts from '@/components/DisplayProducts';
import { fetchedProduct } from '@/pages/api/product/getProducts';
import { fetchData } from '@/utils/apiRequests';
import SearchBox from '@/components/SearchBox';

const Products: React.FC<fetchedProduct> = () => {
	const [fetchedProducts, setFetchedProducts] = useState<Array<fetchedProduct>>(
		[]
	);
	const [filteredProducts, setFilteredProducts] = useState<
		Array<fetchedProduct>
	>([]);
	const [isLoading, setIsLoading] = useState(false);

	const getProducts = async () => {
		setIsLoading(true);
		await fetchData(setFetchedProducts, setIsLoading, 'products');
	};

	useEffect(() => {
		getProducts();
	}, []);

	const handleFilterChange = (filteredData: fetchedProduct[]) => {
		setFilteredProducts(filteredData);
	};

	return (
		<Layout>
			{isLoading ? (
				<>
					<h1 className='header'>Products</h1>
					<div className='w-full h-full flex justify-center items-center'>
						<Spiner />
					</div>
				</>
			) : (
				<>
					<div className='flex justify-between items-center'>
						<SearchBox
							onFilterChange={handleFilterChange}
							products={fetchedProducts}
						/>
						<Link className='btn-primary mt-4' href={'/products/new'}>
							Add new product
						</Link>
					</div>
					<h1 className='header'>Products</h1>
					<DisplayProducts
						products={
							filteredProducts.length > 0 ? filteredProducts : fetchedProducts
						}
					/>
				</>
			)}
		</Layout>
	);
};

export default Products;
