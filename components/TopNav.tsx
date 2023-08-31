import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const TopNav = () => {
	const { data: session, status } = useSession();
	const [isOpen, setIsOpen] = useState(false);
	// console.log(session);

	const toggleTheme = () => {
		if (!isOpen) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	};
	if (session)
		return (
			<nav className='flex justify-evenly items-center bg-white border-b border-gray-300 w-full py-2'>
				<h1 className='text-gray-700 text-xl font-bold '>
					<Link href={'/'}>Ecommerce Admin Page</Link>
				</h1>
				<div className='relative flex flex-col justify-center gap-2 items-end'>
					<Link href={'/'} className='flex items-center  gap-2'>
						<p>{session.user?.name}</p>

						{session.user?.image ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={session.user?.image}
								alt=''
								className='w-9 h-9 rounded-full'
							/>
						) : (
							<div className='w-10 h-10 rounded-full border p-1 cursor-pointer flex justify-center items-center '>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-6 h-6 '>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
									/>
								</svg>
							</div>
						)}
					</Link>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						onClick={toggleTheme}
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke={isOpen ? 'yellow' : 'currentColor'}
						className='w-6 h-6 cursor-pointer mr-2'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
						/>
					</svg>
					<div
						className={
							isOpen
								? 'absolute top-full mx-auto text-left w-24 border border-gray-300 bg-gray-200 p-2 rounded-md '
								: 'hidden'
						}>
						<span className='block cursor-pointer'>System</span>
						<span className=' block cursor-pointer'>Light</span>
						<span className='block  cursor-pointer'>Dark</span>
					</div>
				</div>
			</nav>
		);
};

export default TopNav;
