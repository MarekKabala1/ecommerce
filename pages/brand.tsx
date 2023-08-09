import React from 'react';
import Layout from '@/components/Layout';
import BrandForm, { brandTypes } from '@/components/BrandForm';

const Brand: React.FC<brandTypes> = () => {
	return (
		<Layout>
			<BrandForm id={''} brandName={''} />
		</Layout>
	);
};

export default Brand;
