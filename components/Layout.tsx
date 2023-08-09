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
				<main className=' bg-white border border-gray-300 rounded-xl flex flex-col flex-grow h-max mx-auto my-3 w-full sm:min-w-fit md:max-w-2xl lg:max-w-4xl'>
					<section className='flex h-screen w-full'>
						<SideNav />
						<article className='bg-white  h-5/6 text-gray-700 flex-grow p-4 '>
							{children}
						</article>
					</section>
				</main>
			</>
		);
}
