import { PropsWithChildren } from 'react';
import { useSession } from 'next-auth/react';
import TopNav from '@/components/TopNav';
import SideNav from '@/components/SideNav';

export default function Layout({ children }: PropsWithChildren) {
	const { data: session } = useSession();
	if (session)
		return (
			<div className='bg-linear-gradient flex flex-col h-max'>
				<TopNav />
				<div className='flex h-screen '>
					<SideNav />
					<section className='bg-yellow-50 w-full h-5/6 text-blue-800 flex-grow mt-4 mr-4 mb-4 p-4'>
						{children}
					</section>
				</div>
			</div>
		);
}
