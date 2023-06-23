import { PropsWithChildren } from 'react';
import { useSession, signIn } from 'next-auth/react';
import TopNav from '@/components/TopNav';
import SideNav from '@/components/SideNav';

export default function Layout({ children }: PropsWithChildren) {
	const { data: session } = useSession();
	if (session)
		return (
			<div className='bg-linear-gradient flex flex-col h-screen'>
				<TopNav />
				<div className='flex h-full '>
					<SideNav />
					<section className='bg-yellow-50 text-blue-800 flex-grow mt-4 mr-4 mb-4 p-2'>
						{children}
					</section>
				</div>
			</div>
		);
}
