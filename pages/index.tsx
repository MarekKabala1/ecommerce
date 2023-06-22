import SideNav from '@/components/SideNav';
import TopNav from '@/components/TopNav';
import { useSession } from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();
	return (
		<>
			<div className='bg-blue-900 flex flex-col h-screen'>
				<TopNav />
				<div className='flex h-full '>
					<SideNav />
					<section className='bg-yellow-50 flex-grow mt-4 mr-4 mb-4 p-2'>
						{session?.user?.email}
					</section>
				</div>
			</div>
		</>
	);
}
