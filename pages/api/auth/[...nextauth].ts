import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from 'next-auth/adapters';

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

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
};

