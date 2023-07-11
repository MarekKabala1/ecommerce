/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		loader: 'cloudinary',
		path: 'https://res.cloudinary.com/df6nyjwz2/image/upload',
		domains: ['res.cloudinary.com'],
	},
};

module.exports = nextConfig;
