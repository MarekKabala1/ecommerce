import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();
	return session ? (
		<div className=' bg-blue-900 flex h-screen w-screen items-center justify-center'>
			Signed in as {session.user?.email} <br />
			<button
				onClick={() => signOut()}
				className='bg-white rounded-lg p-2 px-4 '>
				Sign out
			</button>
		</div>
	) : (
		<div className=' bg-blue-900 flex h-screen w-screen items-center justify-center'>
			<button
				onClick={() => {
					signIn('google');
				}}
				className='bg-white rounded-lg p-2 px-4 '>
				Log in with Google
			</button>
		</div>
	);
}
