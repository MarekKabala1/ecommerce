import CategoryForm from '@/components/CategoryForm';
import Layout from '@/components/Layout';
import { categoryTypes } from '@/components/CategoryForm';

const Category: React.FC<categoryTypes> = () => {
	return (
		<Layout>
			<CategoryForm id={''} categoryName={''} />
		</Layout>
	);
};

export default Category;
