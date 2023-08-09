import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from 'next-auth/adapters';

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const adminsEmail = ['marekkabala1@gmail.com']
const authHandler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOption);
export default authHandler;

const prisma = new PrismaClient();

export const authOption: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
	],
	adapter: PrismaAdapter(prisma) as Adapter,
	callbacks: {
		session: ({ session }) => {
			if (adminsEmail.includes(session?.user?.email as string)) {
				return session;
			} else {
				throw new Error('Unauthorized');
			}
		}
	}
}


