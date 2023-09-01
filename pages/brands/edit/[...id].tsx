import BrandForm, { brandTypes } from '@/components/BrandForm';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const EditBrand = () => {
	const [brandToEdit, setBrandToEdit] = useState<brandTypes>();
	const [imagePublicId, setImagePublicId] = useState<string>('');
	const router = useRouter();

	const { id } = router.query;

	useEffect(() => {
		const fetchedBrand = async () => {
			if (!id) {
				return;
			}

			try {
				const response = await fetch(`/api/brands/edit-delete/${id}`, {
					method: 'GET',
				});

				if (response.ok) {
					const brandData: brandTypes = await response.json();
					const public_id = brandData.public_id;

					setBrandToEdit(brandData);
					setImagePublicId(public_id?.toString() as string);
				} else {
					const errorMessage = await response.text();
					throw new Error(
						`Error fetching product data: ${response.status} - ${errorMessage}`
					);
				}
			} catch (err) {
				console.error(err);
				throw new Error('Error fetching product data');
			}
		};

		fetchedBrand();
	}, [id]);

	return (
		<Layout>
			{brandToEdit && (
				<BrandForm
					{...brandToEdit}
					image={`https://res.cloudinary.com/df6nyjwz2/image/upload/${imagePublicId}`}
				/>
			)}
		</Layout>
	);
};

export default EditBrand;
