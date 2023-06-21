import { useSession, signIn, signOut } from 'next-auth/react';

const TopNav = () => {
	const { data: session, status } = useSession();
	// console.log(session, status);
	return session ? (
		<nav className=' bg-blue-500 h-max w-screen'>
			<div className='text-yellow-50 text-center'>Ecommerce Admin Page</div>
			<ul className='flex items-center justify-between px-4 pb-4 text-yellow-50'>
				<div className='flex gap-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
						/>
						Admin:
					</svg>
					<div>{session.user?.name}</div>
				</div>
				<button
					onClick={() => signOut()}
					className='bg-white rounded-lg p-1 px-4 text-black '>
					Sign out
				</button>
			</ul>
		</nav>
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
};

export default TopNav;
