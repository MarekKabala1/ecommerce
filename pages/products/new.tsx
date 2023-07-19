import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';

const NewProduct = () => {
	return (
		<Layout>
			<h1 className='header'>New Product</h1>
			<ProductForm />
		</Layout>
	);
};

export default NewProduct;
