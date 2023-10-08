import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { fetchData, makeApiRequest } from '@/utils/apiRequests';
import Spiner from '@/components/Spiner';
import { FetchedBrand } from '@/pages/api/brands/getBrands';
import { FetchedCategory } from '@/pages/api/categorys/getCategorys';

export interface Product {
	id?: string;
	productName?: string;
	categoryId?: string | undefined | null;
	brandId?: string | undefined | null;
	description?: string;
	imageUrl?: string | undefined;
	public_id?: string | undefined;
	isFeatured?: boolean;
	isArchived?: boolean;
	price?: number;
	quantity?: number;
}
export interface ProductFormProps {
	existingProduct?: Product;
	image?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ existingProduct }) => {
	const [product, setProduct] = useState<Product>({
		id: '',
		productName: '',
		categoryId: '',
		brandId: '',
		description: '',
		imageUrl: '',
		public_id: '',
		isFeatured: false,
		isArchived: false,
		price: 0,
		quantity: 0,
	});
	const [fetchedBrands, setFetchedBrands] = useState<FetchedBrand[]>([]);
	const [fetchedCategories, setFetchedCategories] = useState<FetchedCategory[]>(
		[]
	);
	const [image, setImage] = useState<string | undefined>(
		existingProduct?.imageUrl || ''
	);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		// Fetch brands and categories here
		fetchData(setFetchedBrands, setIsLoading, 'brands');
		fetchData(setFetchedCategories, setIsLoading, 'categorys');

		if (existingProduct) {
			setProduct({
				id: existingProduct.id || '',
				productName: existingProduct.productName || '',
				categoryId: existingProduct.categoryId || '',
				brandId: existingProduct.brandId || '',
				description: existingProduct.description || '',
				imageUrl: existingProduct.imageUrl || '',
				public_id: existingProduct.public_id || '',
				isFeatured: existingProduct.isFeatured || false,
				isArchived: existingProduct.isArchived || false,
				price: existingProduct.price || 0,
				quantity: existingProduct.quantity || 0,
			});
			setImage(existingProduct.imageUrl || '');
		}
	}, [existingProduct]);

	const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target || !e.target.files || e.target.files.length === 0) {
			return;
		}
		const file = e.target?.files[0];
		previewFile(file);
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

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value, type, checked } = e.target as HTMLInputElement;

		if (type === 'checkbox') {
			setProduct({ ...product, [name]: checked });
		} else {
			let numericValue: string | number;

			if (type === 'number') {
				numericValue = parseFloat(value);
			} else {
				numericValue = value;
			}

			if (numericValue === '' || !isNaN(numericValue as number)) {
				// Check if the input is 'quantity' and the value is greater than or equal to 0
				if (name === 'quantity' && (numericValue as number) >= 0) {
					setProduct({
						...product,
						[name]: numericValue as number,
						isArchived: numericValue === 0,
					});
				} else {
					setProduct({ ...product, [name]: numericValue });
				}
			} else {
				setProduct({ ...product, [name]: value });
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (id) {
				const editProduct = await makeApiRequest(
					`/api/product/edit-delete/${id}`,
					'PUT',
					{ ...product }
				);
			} else {
				const addImageToCloudinary = await makeApiRequest(
					'/api/upload/image',
					'POST',
					{
						data: image,
					}
				);

				product.imageUrl = addImageToCloudinary.imageUrl;
				product.public_id = addImageToCloudinary.public_id;
				let fullId = addImageToCloudinary.cludinary_id;
				product.id = fullId.slice(14);

				setProduct({
					...product,
					imageUrl: product.imageUrl as string,
					public_id: product.public_id as string,
					id: product.id as string,
				});
				const productResponse = await makeApiRequest(
					'/api/upload/product',
					'POST',
					{ data: product }
				);
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
			setProduct({
				id: '',
				productName: '',
				categoryId: '',
				brandId: '',
				description: '',
				imageUrl: '',
				public_id: '',
				isFeatured: false,
				isArchived: false,
				price: 0,
				quantity: 0,
			});
			router.push('/products');
			setImage('');
		}
	};

	return (
		<div>
			{isLoading ? (
				<Spiner />
			) : (
				<form onSubmit={handleSubmit} className='max-w-lg mx-auto '>
					<label>
						Category:
						<select
							name='categoryId'
							value={product.categoryId as string}
							onChange={handleInputChange}
							required>
							<option value=''>Select a Category</option>
							{fetchedCategories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.categoryName}
								</option>
							))}
						</select>
					</label>
					<div className='flex justify-between items-center'>
						<label>
							Product Name:
							<input
								type='text'
								name='productName'
								value={product.productName}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Brand:
							<select
								name='brandId'
								value={product.brandId as string}
								onChange={handleInputChange}
								required>
								<option value=''>Select a Brand</option>
								{fetchedBrands.map((brand) => (
									<option key={brand.id} value={brand.id}>
										{brand.brandName}
									</option>
								))}
							</select>
						</label>
					</div>
					<label>
						Description:
						<textarea
							name='description'
							value={product.description}
							onChange={handleInputChange}
							required
						/>
					</label>
					<div className='flex justify-between items-center'>
						<label>
							Price:
							<input
								type='number'
								name='price'
								value={product?.price || 0}
								onChange={handleInputChange}
								required
							/>
						</label>
						<label>
							Quantity:
							<input
								type='number'
								name='quantity'
								value={product.quantity || 0}
								onChange={handleInputChange}
								required
							/>
						</label>
					</div>
					<div className='w-32 flex flex-row  align-center p p-1'>
						<label htmlFor='isFeatured'>Featured:</label>
						<input
							className='m-0 w-4'
							type='checkbox'
							name='isFeatured'
							checked={product.isFeatured}
							id='isFeatured '
							onChange={handleInputChange}
						/>
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
						<button className='btn-primary text-xs p-4' type='submit'>
							{id ? 'Update Product' : 'Add Product'}
						</button>
					</div>
					<div className=' h-32 w-32 mt-2 relative text-center'>
						{image ? (
							<Image
								src={image as string}
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
		</div>
	);
};

export default ProductForm;
