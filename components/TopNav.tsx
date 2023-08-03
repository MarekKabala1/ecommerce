import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const TopNav = () => {
	const { data: session, status } = useSession();
	if (session)
		return (
			<nav className=' bg-transparent w-full'>
				<h1 className='text-blue-800 text-center text-xl mt-3'>
					<b>Ecommerce Admin Page</b>{' '}
				</h1>
				<aside className='flex items-center justify-between px-4 pb-4 text-blue-800'>
					<Link href={'/'} className='flex gap-2'>
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
						</svg>
						<div>{session.user?.name}</div>
					</Link>
					<button onClick={() => signOut()} className='btn-primary'>
						Sign out
					</button>
				</aside>
			</nav>
		);
};

export default TopNav;
