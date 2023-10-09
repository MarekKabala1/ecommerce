import { PropsWithChildren } from 'react';
import { useSession } from 'next-auth/react';
import TopNav from '@/components/TopNav';
import SideNav from '@/components/SideNav';

export default function Layout({ children }: PropsWithChildren) {
	const { data: session } = useSession();
	if (session)
		return (
			<>
				<TopNav />
				<main className=' bg-white border border-gray-300 rounded-xl flex flex-col flex-grow h-max mx-auto my-5 w-full sm:min-w-fit md:max-w-2xl lg:max-w-4xl'>
					<section className='flex mb-4 h-fit w-full'>
						<SideNav />
						<article className='bg-white text-gray-700 flex-grow p-2 '>
							{children}
						</article>
					</section>
				</main>
			</>
		);
}
