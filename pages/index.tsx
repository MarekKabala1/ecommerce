import Layout from '@/components/Layout';
import { signIn, useSession } from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();
	return session ? (
		<Layout>
			<h1 className='header'>
				Hello, <b>{session.user?.name}</b>
			</h1>
		</Layout>
	) : (
		<div className=' bg-linear-gradient flex h-screen w-screen items-center justify-center'>
			<button
				onClick={() => {
					signIn('google');
				}}
				className='bg-white rounded-lg p-2 px-4 text-blue-800 '>
				Log in with Google
			</button>
		</div>
	);
}
